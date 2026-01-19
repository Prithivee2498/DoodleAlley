import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [isActive, setIsActive] = useState(true);

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
        }
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImageUrls('');
    setIsActive(true);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setCategory(product.category);
    setImageUrls(product.images.join('\n'));
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
      images: imageUrls.split('\n').filter((url) => url.trim()),
      isActive,
    };

    try {
      if (editingProduct) {
        // Update existing product
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products/${editingProduct.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(productData),
          }
        );

        if (response.ok) {
          toast.success('Product updated successfully');
          fetchProducts();
          setIsDialogOpen(false);
        } else {
          toast.error('Failed to update product');
        }
      } else {
        // Create new product
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify(productData),
          }
        );

        if (response.ok) {
          toast.success('Product created successfully');
          fetchProducts();
          setIsDialogOpen(false);
        } else {
          toast.error('Failed to create product');
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button
          onClick={openCreateDialog}
          className="flex items-center gap-2"
          style={{ backgroundColor: '#c7b8ea', color: 'white' }}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No products yet. Create your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {product.images && product.images.length > 0 && (
                <div className="aspect-square bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold mb-2" style={{ color: '#7c5db8' }}>
                  ${product.price}
                </p>
                {product.category && (
                  <p className="text-sm text-gray-500 mb-3">
                    Category: {product.category}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditDialog(product)}
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 hover:bg-red-50"
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g., Custom Portrait Doodle"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="29.99"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Portraits, Landscapes, Abstract"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe your artwork..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="imageUrls">Image URLs (one per line)</Label>
              <Textarea
                id="imageUrls"
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                rows={4}
                className="mt-1 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter each image URL on a new line
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Active (visible to customers)</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                style={{ backgroundColor: '#c7b8ea', color: 'white' }}
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
