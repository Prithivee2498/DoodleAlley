import { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderFormProps {
  productId: string;
  onBack: () => void;
}

export function OrderForm({ productId, onBack }: OrderFormProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save order to backend
      const orderData = {
        productId,
        productName: product?.name,
        productPrice: product?.price,
        customerName,
        phoneNumber,
        deliveryAddress,
        quantity,
        notes,
        totalPrice: (product?.price || 0) * quantity,
      };

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      // Prepare Instagram DM message
      const message = `🎨 New Order from Doodle Alley!\n\n` +
        `📦 Product: ${product?.name}\n` +
        `💰 Price: $${product?.price} x ${quantity} = $${(product?.price || 0) * quantity}\n\n` +
        `👤 Customer: ${customerName}\n` +
        `📱 Phone: ${phoneNumber}\n` +
        `📍 Address: ${deliveryAddress}\n` +
        `${notes ? `📝 Notes: ${notes}\n` : ''}\n` +
        `Thank you! 💜`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);

      // Open Instagram DM
      // Note: Replace 'doodlealley' with your actual Instagram username
      const instagramUsername = 'doodle.alley';
      
      // Try Instagram app deep link first, fallback to web
      const instagramAppLink = `instagram://user?username=${instagramUsername}`;
      const instagramWebLink = `https://ig.me/m/${instagramUsername}`;
      
      // For better UX, we'll open the web link which works on all devices
      window.open(instagramWebLink, '_blank');
      
      // Show success message
      toast.success('Order details saved! Opening Instagram DM...');
      
      // Copy message to clipboard for easy pasting
      navigator.clipboard.writeText(message);
      toast.info('Order details copied to clipboard!');

    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Product not found</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-[#e6dff7]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Place Your Order</h1>
          <p className="text-gray-600">Fill in your details below</p>
        </div>

        {/* Product Summary */}
        <div className="mb-8 p-6 rounded-lg border border-gray-200" style={{ backgroundColor: '#f9f8fc' }}>
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <p className="text-gray-700">{product.name}</p>
          <p className="text-xl font-bold mt-2" style={{ color: '#c7b8ea' }}>
            ${product.price} each
          </p>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="customerName">Your Name *</Label>
            <Input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="+1 (555) 000-0000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="deliveryAddress">Delivery Address *</Label>
            <Textarea
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              placeholder="123 Main St, Apt 4B, New York, NY 10001"
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              required
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Total: ${((product.price || 0) * quantity).toFixed(2)}
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or customizations?"
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full text-lg py-6"
              style={{ backgroundColor: '#b8e6d5', color: '#2d5f4f' }}
            >
              {submitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Order to Instagram DM
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              📱 Your order details will be saved and Instagram DM will open.
            </p>
            <p className="mt-1">
              The message will be copied to your clipboard for easy sending!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
