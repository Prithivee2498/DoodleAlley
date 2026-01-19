import { useState, useEffect } from 'react';
import { PublicCatalog } from '@/app/components/PublicCatalog';
import { ProductDetail } from '@/app/components/ProductDetail';
import { OrderForm } from '@/app/components/OrderForm';
import { TestimonialsSlider } from '@/app/components/TestimonialsSlider';
import { AdminLogin } from '@/app/components/AdminLogin';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { Button } from '@/app/components/ui/button';
import { Lock } from 'lucide-react';
import { Toaster } from '@/app/components/ui/sonner';

type View = 'catalog' | 'product-detail' | 'order-form' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminLoggedIn);
  }, []);

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
  };

  const handlePlaceOrder = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('order-form');
  };

  const handleBackToCatalog = () => {
    setSelectedProductId(null);
    setCurrentView('catalog');
  };

  const handleAdminLogin = () => {
    setCurrentView('admin-login');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('catalog');
  };

  return (
    <>
      {currentView === 'catalog' && (
        <>
          <PublicCatalog
            onViewProduct={handleViewProduct}
            onPlaceOrder={handlePlaceOrder}
          />
          <TestimonialsSlider />
          
          {/* Admin Access Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={handleAdminLogin}
              className="rounded-full shadow-lg"
              style={{ backgroundColor: '#c7b8ea', color: 'white' }}
              size="lg"
            >
              <Lock className="w-5 h-5 mr-2" />
              Admin
            </Button>
          </div>
        </>
      )}

      {currentView === 'product-detail' && selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onBack={handleBackToCatalog}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentView === 'order-form' && selectedProductId && (
        <OrderForm
          productId={selectedProductId}
          onBack={handleBackToCatalog}
        />
      )}

      {currentView === 'admin-login' && (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBack={handleBackToCatalog}
        />
      )}

      {currentView === 'admin-dashboard' && isAdminLoggedIn && (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}

      <Toaster position="top-right" />
    </>
  );
}
