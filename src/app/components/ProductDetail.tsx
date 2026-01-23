import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  isActive: boolean;
}

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onPlaceOrder: (productId: string) => void;
}

export function ProductDetail({ productId, onBack, onPlaceOrder }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFDF9]">
        <div className="text-lg text-[#1E293B]">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFDF9]">
        <p className="text-lg mb-4 text-[#1E293B]">Product not found</p>
        <Button onClick={onBack} className="bg-[#D97706] text-white hover:bg-[#b45309]">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Header with Back Button */}
      <header className="border-b border-orange-100/50 bg-[#FFFDF9]/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-orange-50 text-[#1E293B]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Catalog
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-[#FFF7ED] rounded-3xl overflow-hidden border border-orange-100">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110 text-[#1E293B]"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110 text-[#1E293B]"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#1E293B]/40">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-[#D97706] shadow-md scale-105'
                        : 'border-orange-100 hover:border-orange-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {product.category && (
              <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 w-fit bg-orange-100/50 text-[#D97706]">
                {product.category}
              </span>
            )}
            
            <h1 className="text-4xl font-bold mb-4 text-[#1E293B]">{product.name}</h1>
            
            <p className="text-3xl font-bold mb-6 text-[#D97706]">
              ₹{product.price}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-[#1E293B]">Description</h3>
              <p className="text-[#1E293B]/80 leading-relaxed">{product.description}</p>
            </div>

            <Button
              onClick={() => onPlaceOrder(product.id)}
              size="lg"
              className="w-full text-lg py-6 bg-[#D97706] text-white hover:bg-[#b45309] shadow-lg hover:shadow-xl transition-all"
            >
              Place Order
            </Button>

            <div className="mt-8 p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
              <p className="text-sm text-[#1E293B]/80">
                ✨ <strong className="text-[#D97706]">Handmade with love</strong> - Each piece is unique and made with care
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}