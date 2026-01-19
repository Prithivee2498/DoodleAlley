import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { projectId, publicAnonKey } from '/utils/supabase/info';

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

interface PublicCatalogProps {
  onViewProduct: (productId: string) => void;
  onPlaceOrder: (productId: string) => void;
}

export function PublicCatalog({ onViewProduct, onPlaceOrder }: PublicCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

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
      const activeProducts = (data.products || []).filter((p: Product) => p.isActive);
      setProducts(activeProducts);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(activeProducts.map((p: Product) => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-center mb-2" style={{ color: '#c7b8ea' }}>
            Doodle Alley
          </h1>
          <p className="text-center text-gray-600">Handcrafted art & doodles with love</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border-gray-300 focus:border-[#c7b8ea] focus:ring-[#c7b8ea]"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 border-gray-300">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No artworks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-gray-50">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="mb-3">
                    {product.category && (
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#e6dff7', color: '#7c5db8' }}
                      >
                        {product.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold mb-4" style={{ color: '#c7b8ea' }}>
                    ${product.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onViewProduct(product.id)}
                      variant="outline"
                      className="flex-1 border-[#c7b8ea] text-[#7c5db8] hover:bg-[#e6dff7]"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => onPlaceOrder(product.id)}
                      className="flex-1"
                      style={{ backgroundColor: '#b8e6d5', color: '#2d5f4f' }}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
