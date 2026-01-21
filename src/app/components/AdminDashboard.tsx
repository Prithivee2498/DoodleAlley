import { useState } from 'react';
import { LogOut, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ProductsManager } from './ProductsManager';
import { OrdersManager } from './OrdersManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Header */}
      <header className="bg-white border-b border-orange-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#D97706]">
                Doodle Alley Admin
              </h1>
              <p className="text-sm text-[#1E293B]/70">Manage your artworks and orders</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 border-orange-200 hover:bg-orange-50 text-[#1E293B]"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-white border border-orange-100">
            <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-[#D97706] data-[state=active]:text-white">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-[#D97706] data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}