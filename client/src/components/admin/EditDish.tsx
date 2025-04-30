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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import axios from "axios";
export const EditDish = ({ food }) => {
  const [open, setOpen] = useState(false);
  const [foodData, setFoodData] = useState({
    foodName: food.foodName || "",
    price: food.price?.toString() || "",
    image: food.image || "",
    category: food.category || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    setFoodData({
      foodName: food.foodName || "",
      price: food.price?.toString() || "",
      image: food.image || "",
      category: food.category || "",
    });
    setSelectedFile(null);
    setUploadError(null);
  }, [food]);

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/food-categories"
        );
        setCategories(response.data);
        const initialCategory = response.data.find(
          (cat) => cat._id === food.category
        );
        setFoodData((prevData) => ({
          ...prevData,
          category: food.category || "",
          categoryName: initialCategory?.categoryName || "",
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategoryName =
      categories.find((cat) => cat._id === selectedCategoryId)?.categoryName ||
      "";
    setFoodData((prevData) => ({
      ...prevData,
      category: selectedCategoryId,
      categoryName: selectedCategoryName,
    }));
  };
  const handleUpdateFood = async () => {
    setLoadingUpdate(true);
    setUpdateError(null);
    let imageUrl = foodData.image;

    if (selectedFile) {
      setUploading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "sumiya_upload");

      try {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
        const response = await axios.post(cloudinaryUrl, formData);
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError("Failed to upload new image.");
        setUploading(false);
        setLoadingUpdate(false);
        return;
      } finally {
        setUploading(false);
      }
    }
    try {
      const response = await axios.patch(
        `http://localhost:3001/foods/${food._id}`,
        {
          foodName: foodData.foodName,
          price: parseInt(foodData.price),
          image: imageUrl,
          category: foodData.category,
        },
        { headers: authHeader() }
      );

      console.log("Food updated successfully:", response.data);
      setOpen(false);
      setFoodData({ foodName: "", price: "", image: "", category: "" });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating food:", error);
      setUpdateError("Failed to update food.");
    } finally {
      setLoadingUpdate(false);
    }
  };
  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Food</DialogTitle>
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
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={foodData.category}
                onChange={handleCategoryChange}
                className="col-span-3 border rounded-md py-2 px-3"
              >
                           {" "}
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                              {cat.categoryName}       {" "}
                  </option>
                ))}
                   {" "}
              </select>
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
                {uploading ? "Uploading..." : "Upload New Image"}
              </Button>
              {uploadError && (
                <p className="text-red-500 col-span-4">{uploadError}</p>
              )}
              {foodData.image && !selectedFile && (
                <img
                  src={foodData.image}
                  alt="Current Dish"
                  className="mt-2 max-h-20 col-span-4"
                />
              )}
              {selectedFile && (
                <p className="col-span-4">Selected File: {selectedFile.name}</p>
              )}
            </div>
          </div>
          {updateError && <p className="text-red-500">{updateError}</p>}
          <DialogFooter>
            <Button
              type="button"
              onClick={handleUpdateFood}
              disabled={loadingUpdate || uploading}
            >
              {loadingUpdate ? "Updating..." : "Update Food"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
