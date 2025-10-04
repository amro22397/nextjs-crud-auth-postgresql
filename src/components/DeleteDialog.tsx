"use client";


import React from 'react'

import { deletePlant } from "@/actions/plant.action";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";


interface DeleteDialogProps {
  plant: {
    id: string;
  };
}

const DeleteDialog = ({ plant }: DeleteDialogProps) => {

    const handleSubmit = async (e: any) => {
        
        e.preventDefault();

        try {
            const deletedPlant = await deletePlant(plant.id);

            // await recycleBin(deletedPlant)

            toast.success("Plant is deleted successfully!");

        } catch (error) {
            
            toast.error("Error deleting plant");

        }
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <Trash2 className="w-4 h-4" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete the plant
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Confirm Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog