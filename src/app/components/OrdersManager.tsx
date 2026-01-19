import { useState, useEffect } from 'react';
import { Download, Package } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { toast } from 'sonner';
import Papa from 'papaparse';

interface Order {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  quantity: number;
  notes?: string;
  totalPrice: number;
  createdAt: string;
}

export function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dc0a659/orders`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      // Sort orders by date, newest first
      const sortedOrders = (data.orders || []).sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (orders.length === 0) {
      toast.error('No orders to export');
      return;
    }

    const csvData = orders.map((order) => ({
      'Order ID': order.id,
      'Product Name': order.productName,
      'Product Price': order.productPrice,
      'Quantity': order.quantity,
      'Total Price': order.totalPrice,
      'Customer Name': order.customerName,
      'Phone Number': order.phoneNumber,
      'Delivery Address': order.deliveryAddress,
      'Notes': order.notes || '',
      'Order Date': new Date(order.createdAt).toLocaleString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `doodle-alley-orders-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Orders exported successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total orders: {orders.length}
          </p>
        </div>
        <Button
          onClick={exportToCSV}
          disabled={orders.length === 0}
          className="flex items-center gap-2"
          style={{ backgroundColor: '#b8e6d5', color: '#2d5f4f' }}
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-2">
                    ORDER DETAILS
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Order ID: <span className="font-mono">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Date:{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <div className="mt-3">
                    <p className="font-semibold">{order.productName}</p>
                    <p className="text-sm text-gray-600">
                      ${order.productPrice} × {order.quantity} = $
                      {order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-2">
                    CUSTOMER INFO
                  </h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Name:</span>{' '}
                    {order.customerName}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Phone:</span>{' '}
                    {order.phoneNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Address:</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.deliveryAddress}
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-2">
                    NOTES
                  </h3>
                  {order.notes ? (
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No notes</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
