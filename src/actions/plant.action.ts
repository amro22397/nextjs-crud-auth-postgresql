'use server'

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";


export async function getPlants(searchTerm?: string) {


    try {
        const currentUserId = await getUserId();

        const whereClause: any = {
            userId: currentUserId,
        };


        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive",
            };
        }


        const userPlants = await prisma.plants.findMany({
            where: whereClause,
        });

        revalidatePath('/');

        return {
            success: true,
            userPlants
        }

        // `SELECT * FROM Plants WEHRE userId = ${currentUserId} AND name LIKE '%${searchTerm}' 
    } catch (error) {
        
        console.log(`Error is ${error}`);
        throw new Error("Failed to fetch plants")
    }
}


export async function getPlantById(id: string) {

    return await prisma.plants.findUnique({
        where: { id },
    });

}


export async function createPlant(data: Prisma.PlantsCreateInput) {

    try {
        
        const currentUserId = await getUserId();

        if (!currentUserId) return;

        const newPlant = await prisma.plants.create({
            data: {
                ...data,
                userId: currentUserId,
            }
        })

        revalidatePath('/');

        return newPlant;

    } catch (error: any) {
        // return {
        //     success: false,
        //     error: error
        // }
        console.log(`Error creating plant ${error}`)
        throw new Error(error);
        
    }
}



export async function editPlant(id: string, data: Prisma.PlantsUpdateInput) {

    try {
        
        const currentUserId = await getUserId();

    if (!currentUserId) return;

    const updatedPlant = await prisma.plants.update({
        where: { id },
        data: {
            ...data,
            userId: currentUserId,
        }
    })

    revalidatePath('/');

    } catch (error: any) {
        
        console.log(`Error updating plant ${error}`)
        throw new Error(error);

    }
}



export async function deletePlant(id: string) {

    try {

        const currentUserId = await getUserId();
        if (!currentUserId) return;
        
        const deletedPlant = await prisma.plants.delete({
            where: { id }
        })

        revalidatePath('/');

        return deletedPlant;

    } catch (error: any) {
        
        console.log(`Server Error deleting plant ${error}`);
        throw new Error(error)
    }
}