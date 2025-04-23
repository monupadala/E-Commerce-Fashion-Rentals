
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  // Mock orders data - in a real app this would come from an API
  const orders = [
    {
      id: "ORD12345",
      date: "2023-04-15",
      totalAmount: 3850,
      status: "delivered",
      items: [
        {
          name: "Designer Saree",
          qty: 1,
          duration: 3,
          price: 1200,
        },
        {
          name: "Men's Suit",
          qty: 1,
          duration: 2,
          price: 2500,
        }
      ]
    },
    {
      id: "ORD12346",
      date: "2023-04-01",
      totalAmount: 4500,
      status: "returned",
      items: [
        {
          name: "Lehenga",
          qty: 1,
          duration: 2,
          price: 2000,
        },
        {
          name: "Designer Jewelry Set",
          qty: 1,
          duration: 3,
          price: 1500,
        }
      ]
    },
    {
      id: "ORD12347",
      date: "2023-03-20",
      totalAmount: 1800,
      status: "cancelled",
      items: [
        {
          name: "Party Gown",
          qty: 1,
          duration: 2,
          price: 1800,
        }
      ]
    },
    {
      id: "ORD12348",
      date: "2023-05-10",
      totalAmount: 5300,
      status: "shipped",
      items: [
        {
          name: "Wedding Sherwani",
          qty: 1,
          duration: 3,
          price: 3500,
        },
        {
          name: "Traditional Shoes",
          qty: 1,
          duration: 3,
          price: 800,
        },
        {
          name: "Turban",
          qty: 1,
          duration: 3,
          price: 1000,
        }
      ]
    }
  ];

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Helper function to render status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>;
      case 'shipped':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Shipped</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>;
      case 'returned':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Returned</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Button asChild className="bg-brand-red hover:bg-brand-red/90">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">Order #{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <p className="text-sm font-medium">
                    Total: ₹{order.totalAmount}
                  </p>
                  <div className="mt-2">
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                    >
                      <Link to={`/order/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-medium mb-2">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </h4>
                <div className="space-y-3">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded"></div>
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.qty}, Duration: {item.duration} days
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">₹{item.price * item.duration}</p>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{order.items.length - 2} more items
                    </p>
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
