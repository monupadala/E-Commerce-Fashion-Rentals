
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Dummy cart items - in a real app this would come from CartContext
  const cartItems = [
    {
      id: "1",
      name: "Designer Saree",
      size: "Free Size",
      color: { name: "Red", code: "#FF0000" },
      price: 1200,
      duration: 3,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
    },
    {
      id: "2",
      name: "Men's Suit",
      size: "42",
      color: { name: "Navy Blue", code: "#000080" },
      price: 2500,
      duration: 2,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
    }
  ];

  const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.duration), 0);
  const deliveryFee = 150;
  const gst = Math.round(subTotal * 0.18);
  const total = subTotal + deliveryFee + gst;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be delivered soon.",
      });
      setIsProcessing(false);
      navigate("/orders");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Shipping & Payment Info */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={shippingInfo.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={shippingInfo.email} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={shippingInfo.phone} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input 
                    id="pincode" 
                    name="pincode" 
                    value={shippingInfo.pincode} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={shippingInfo.address} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={shippingInfo.city} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={shippingInfo.state} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="paymentMethod" 
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 text-brand-red focus:ring-brand-red"
                  />
                  <label htmlFor="cod" className="ml-2 text-gray-700">Cash on Delivery</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="card" 
                    name="paymentMethod" 
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 text-brand-red focus:ring-brand-red"
                  />
                  <label htmlFor="card" className="ml-2 text-gray-700">Credit/Debit Card</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="upi" 
                    name="paymentMethod" 
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="h-4 w-4 text-brand-red focus:ring-brand-red"
                  />
                  <label htmlFor="upi" className="ml-2 text-gray-700">UPI</label>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full md:w-auto bg-brand-red hover:bg-brand-red/90" 
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
        
        {/* Right Side - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Size: {item.size}, Color: {item.color.name}, {item.duration} days
                  </p>
                </div>
                <div className="font-medium">
                  ₹{item.price * item.duration}
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
