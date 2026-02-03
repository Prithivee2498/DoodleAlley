import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ProductsManager() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey,
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      const filePath = `products/${Date.now()}-${compressedFile.name}`;

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset input to allow re-selection
      }

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, compressedFile);

      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
        continue;
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset input to allow re-selection
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath);

      setImageUrls((prev) => [...prev, publicUrl]);
      toast.success(`Uploaded ${file.name}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImageUrls([]);
    setIsActive(true);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    setImageUrls(product.images);
    setIsActive(product.isActive);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      images: imageUrls,
      isActive,
    };

    try {
      if (editingProduct) {
        // Update existing product
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products/${editingProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(productData),
          },
        );

        if (response.ok) {
          toast.success("Product updated successfully");
          fetchProducts();
          setIsDialogOpen(false);
        } else {
          toast.error("Failed to update product");
        }
      } else {
        // Create new product
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(productData),
          },
        );

        if (response.ok) {
          toast.success("Product created successfully");
          fetchProducts();
          setIsDialogOpen(false);
        } else {
          toast.error("Failed to create product");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const productToDelete = products.find((p) => p.id === id);

    if (!productToDelete) {
      toast.error("Product not found");
      return;
    }

    const imagePaths = productToDelete.images
      .map((url) => url.split("/product-images/")[1])
      .filter(Boolean); // remove undefined/null

    try {
      if (imagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("product-images")
          .remove(imagePaths);

        if (storageError) {
          console.error("Image delete failed:", storageError);
          toast.error("Image delete failed");
          return;
        }

        console.log("Deleted images:", imagePaths);
      }

      // Delete product from DB
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        },
      );

      if (response.ok) {
        toast.success("Product and image deleted");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-[#1E293B]">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B]">Products</h2>
        <Button
          onClick={openCreateDialog}
          className="flex items-center gap-2 bg-[#D97706] text-white hover:bg-[#b45309] shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-orange-100">
          <p className="text-[#1E293B]/60">
            No products yet. Create your first product!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
            >
              {product.images && product.images.length > 0 && (
                <div className="aspect-square bg-[#FFF7ED] overflow-x-auto">
                  <div className="flex w-max h-full">
                    {product.images.map((imgUrl, idx) => (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`${product.name}-${idx}`}
                        className="w-full h-full object-cover max-w-[100%]"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-[#1E293B]">
                    {product.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm text-[#1E293B]/70 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold mb-2 text-[#D97706]">
                  ₹{product.price}
                </p>
                {product.category && (
                  <p className="text-sm text-[#1E293B]/60 mb-3">
                    Category: {product.category}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditDialog(product)}
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-1 border-orange-200 hover:bg-orange-50"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1E293B]">
              {editingProduct ? "Edit Product" : "Create New Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#1E293B]">
                Product Name *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g., Custom Portrait Doodle"
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-[#1E293B]">
                Price (INR) *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="29.99"
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-[#1E293B]">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Portraits, Landscapes, Abstract"
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-[#1E293B]">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe your artwork..."
                rows={4}
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
              />
            </div>

            <div>
              <Label htmlFor="imageUpload" className="text-[#1E293B]">
                Upload Image
              </Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                className="mt-1 border-orange-100 focus:border-[#D97706] focus:ring-[#D97706]"
                onChange={handleFileUpload}
              />

              <p className="text-xs text-[#1E293B]/60 mt-1">
                Upload one image. You can also paste URLs below.
              </p>
            </div>
            {imageUrls.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImageUrls((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl hover:bg-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive" className="text-[#1E293B]">
                Active (visible to customers)
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 border-orange-200 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#D97706] text-white hover:bg-[#b45309] shadow-md"
              >
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
