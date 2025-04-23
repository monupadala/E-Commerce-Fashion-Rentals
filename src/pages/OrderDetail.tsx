
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // Mock order data - in a real app this would come from an API based on the ID
  const order = {
    id: id || "ORD12345",
    date: "2023-04-15",
    totalAmount: 3850,
    status: "delivered",
    paymentMethod: "Cash on Delivery",
    deliveryDate: "2023-04-18",
    returnDate: "2023-04-21",
    items: [
      {
        id: "1",
        name: "Designer Saree",
        image: "https://lovable.dev/opengraph-image-p98pqg.png",
        size: "Free Size",
        color: "Red",
        qty: 1,
        duration: 3,
        price: 1200,
      },
      {
        id: "2",
        name: "Men's Suit",
        image: "https://lovable.dev/opengraph-image-p98pqg.png",
        size: "42",
        color: "Navy Blue",
        qty: 1,
        duration: 2,
        price: 2500,
      }
    ],
    address: {
      name: "John Doe",
      street: "123 Main Street",
      landmark: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543210"
    },
    subtotal: 7000,
    deliveryFee: 150,
    gst: 1260, // 18% of subtotal
    discount: 0,
    timeline: [
      { status: "Order Placed", date: "2023-04-15 14:30" },
      { status: "Order Confirmed", date: "2023-04-15 15:45" },
      { status: "Shipped", date: "2023-04-16 10:15" },
      { status: "Out for Delivery", date: "2023-04-18 09:30" },
      { status: "Delivered", date: "2023-04-18 14:20" }
    ]
  };

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
    switch (status.toLowerCase()) {
      case 'delivered':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Delivered</span>;
      case 'shipped':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Shipped</span>;
      case 'processing':
      case 'order confirmed':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">{status}</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelled</span>;
      case 'returned':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Returned</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice Downloaded",
      description: "Your invoice has been downloaded successfully.",
    });
  };

  const handleReturnOrder = () => {
    toast({
      title: "Return Request Initiated",
      description: "Your return request has been initiated. We'll contact you shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold">Order Details</h1>
          <p className="text-gray-600">Order #{order.id}</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleDownloadInvoice}>
            Download Invoice
          </Button>
          {order.status.toLowerCase() === 'delivered' && (
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleReturnOrder}
            >
              Return Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Order Items and Summary */}
        <div className="md:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Order Status</h2>
              {getStatusBadge(order.status)}
            </div>
            
            <div className="relative">
              {/* Timeline */}
              <div className="space-y-6">
                {order.timeline.map((event, index) => {
                  const isCompleted = true; // All events are completed in this example
                  const isLastItem = index === order.timeline.length - 1;
                  
                  return (
                    <div key={index} className="flex relative">
                      {/* Vertical line */}
                      {!isLastItem && (
                        <div className={`absolute left-3 top-4 h-full w-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                      
                      {/* Status dot */}
                      <div className={`relative z-10 mt-1 rounded-full w-6 h-6 flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      
                      {/* Status text */}
                      <div className="ml-4">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Order Items</h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {item.duration} days (₹{item.price}/day)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price * item.duration}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>₹{order.gst}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Order Info */}
        <div className="space-y-6">
          {/* Delivery Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
                <p className="font-medium">{order.address.name}</p>
                <p className="text-sm">{order.address.street}</p>
                <p className="text-sm">{order.address.landmark}</p>
                <p className="text-sm">
                  {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
                <p className="text-sm">Phone: {order.address.phone}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Period</h3>
                <p className="text-sm">
                  <span className="font-medium">Delivered:</span> {formatDate(order.deliveryDate)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Return by:</span> {formatDate(order.returnDate)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Payment Information</h2>
            
            <div>
              <p className="text-sm">
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>
              <p className="text-sm">
                <span className="font-medium">Payment Status:</span> Paid
              </p>
            </div>
          </div>
          
          {/* Need Help */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Need Help?</h2>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Track Delivery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
