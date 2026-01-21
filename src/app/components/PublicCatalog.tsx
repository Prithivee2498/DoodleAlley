import { useState, useEffect } from "react";
import Loader from "@/app/components/ui/loader";
import NavSection from "./NavSection";
import ContainerSection from './ContainerSection';
import { projectId, publicAnonKey } from "/utils/supabase/info";


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

export function PublicCatalog({
  onViewProduct,
  onPlaceOrder,
}: PublicCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
        },
      );
      const data = await response.json();
      const activeProducts = (data.products || []).filter(
        (p: Product) => p.isActive,
      );
      setProducts(activeProducts);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(activeProducts.map((p: Product) => p.category).filter(Boolean)),
      ) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFDF9]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <body className="bg-background-light dark:bg-background-dark text-navy dark:text-gray-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-navy">
        {/* Floating Nav */}
        <NavSection />
        <main className="flex-grow pt-28 pb-10 px-4 md:px-10 lg:px-40 flex justify-center w-full">
          <div className="w-full max-w-[1024px] flex flex-col gap-12">
            {/* House Card */}
            <ContainerSection />
            <section>
              {/* Category */}
              <div className="flex items-center justify-between px-2 mb-6">
                <h3 className="text-2xl font-bold text-navy dark:text-white flex items-center gap-2">
                  Browse by Category
                  <span className="material-symbols-outlined text-primary rotate-12">
                    auto_awesome
                  </span>
                </h3>
                <button className="text-sm font-semibold text-primary hover:text-navy transition-colors hidden sm:block" onClick={() => setSelectedCategory("all")}>View all</button>
              </div>
              {/* Product List */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-2 -mx-2 snap-x">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    value={cat}
                     onClick={() => setSelectedCategory(cat)}
                    className="snap-start shrink-0 flex items-center gap-3 pl-2 pr-6 py-2 bg-white dark:bg-[#3d2b1f] border border-gray-100 dark:border-[#524034] rounded-full shadow-sm hover:shadow-md hover:border-primary transition-all group"
                  >
                    <span className="font-bold text-navy dark:text-white">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </section>
            {/* Card Section */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {filteredProducts.length === 0 ? (
                  <p className="text-center col-span-full text-navy/70 dark:text-gray-300">
                    No Art works Listed
                  </p>
                ) : (
                  filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="group relative flex flex-col gap-3 p-3 bg-white dark:bg-[#3d2b1f] rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-[#524034] transition-all duration-300 hover:-translate-y-2 hover:-rotate-1"
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary/30 -rotate-3 z-10 backdrop-blur-sm opacity-60" />

                      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 relative">
                        {prod.images?.length ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#1E293B]/40">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 px-1">
                        <h4 className="font-bold text-navy dark:text-white line-clamp-1">
                          {prod.name}
                        </h4>
                        <p className="text-sm text-navy/70 dark:text-gray-300 line-clamp-2">
                          {prod.description}
                        </p>
                        <p className="font-extrabold text-navy dark:text-white">
                          ₹{prod.price}
                        </p>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => onViewProduct(prod.id)}
                          className="h-10 px-4 rounded-full bg-white dark:bg-white/5 border border-[#e6e1df] dark:border-white/10 text-navy dark:text-white font-bold hover:bg-background-light dark:hover:bg-white/10 transition-colors flex-1"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onPlaceOrder(prod.id)}
                          className="h-10 px-4 rounded-full bg-primary text-navy font-bold hover:bg-primary/80 transition-colors flex-1"
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </body>
    </>
  );
}
