import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { editPlant, getPlantById } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { UploadButton } from "@/utils/uploadthing";
// import ImageUpload from "./ImageUpload";


type Plant = Awaited<ReturnType<typeof getPlantById>>

interface EditDialogProps {
  plant: Plant | any;
}

const EditDialog = ({ plant }: EditDialogProps) => {

    const [formData, setFormData] = useState(() => ({
    name: plant.name.trim(),
    description: (plant.description || "").trim(),
    stock: plant.stock,
    price: plant.price,
    category: plant.category.trim(),
    userId: plant.userId.trim(),
    imageUrl: plant.imageUrl || "",
  }));

  console.log(formData)


  const handleChange = (field: string, value: string | number) => {
    
    setFormData({ ...formData, [field]: value})
  };


  const handleSubmit = async (e: any) => {
    
    e.preventDefault();

    try {
        
        const updatedPlant = await editPlant(plant.id, formData);

        // console.log(updatedPlant)

        toast.success("Plant is updated successfully!")
    } catch (error) {
        
        console.error(`Error creating plant ${error}`);
        toast.error("Error creating plant")
    }
  }

  return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Plant
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          {/*Image Upload*/}



          <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    toast.success("Image uploaded successfully!")
                    handleChange("imageUrl", res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />



                
          {/* <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div> */}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditDialog