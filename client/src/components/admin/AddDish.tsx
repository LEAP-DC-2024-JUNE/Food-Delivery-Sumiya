"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, ChangeEvent } from "react";
type AddDishProps = {
  categoryId: string;
};
export const AddDish: React.FC<AddDishProps> = ({ categoryId }) => {
  const [foodData, setFoodData] = useState({
    foodName: "",
    price: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleAddFood = async () => {
    if (selectedFile) {
      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "sumiya_upload");

      try {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
        const response = await axios.post(cloudinaryUrl, formData);

        setFoodData((prevData) => ({
          ...prevData,
          image: response.data.secure_url,
        }));
        await axios.post(
          "http://localhost:3001/foods",
          {
            foodName: foodData.foodName,
            price: parseInt(foodData.price),
            category: categoryId,
            image: response.data.secure_url,
          },
          { headers: authHeader() }
        );

        console.log("Food added successfully");
        setFoodData({ foodName: "", price: "", image: "" });
        setOpen(false);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error adding food:", error);
        setUploadError("Failed to upload image or add food.");
      } finally {
        setUploading(false);
      }
    } else {
      try {
        await axios.post(
          "http://localhost:3001/foods",
          {
            foodName: foodData.foodName,
            price: parseInt(foodData.price),
            category: categoryId,
          },
          { headers: authHeader() }
        );
        console.log("Food added successfully");
        setFoodData({ foodName: "", price: "", image: "" });
        setOpen(false);
      } catch (error) {
        console.error("Error adding food:", error);
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-[397px] h-[342px] border-dashed border-2 border-red-500"
          >
            + Add new dish
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new food</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="foodName" className="text-right">
                Food name
              </Label>
              <Input
                id="foodName"
                value={foodData.foodName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={foodData.price}
                onChange={handleInputChange}
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                className="col-span-3"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              {uploadError && <p className="text-red-500">{uploadError}</p>}
              {foodData.image && (
                <img
                  src={foodData.image}
                  alt="Uploaded Dish"
                  className="mt-2 max-h-20"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleAddFood}>
              Add category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
