
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, X, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, updateRentalDuration, subtotal } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  // Shipping cost fixed at ₹99
  const shippingCost = items.length > 0 ? 99 : 0;
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const totalAmount = subtotal + shippingCost + gstAmount;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button onClick={() => navigate("/products")} className="bg-brand-red hover:bg-brand-red/90">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border rounded-md divide-y">
            {items.map((item) => (
              <div key={item.product.id} className="p-4 flex flex-col sm:flex-row">
                <div className="sm:w-32 h-32 mb-4 sm:mb-0 flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 sm:ml-6">
                  <div className="flex justify-between">
                    <Link to={`/product/${item.product.id}`} className="text-lg font-medium hover:text-brand-red">
                      {item.product.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-brand-red"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.color.name} | Size: {item.size}
                  </p>
                  <p className="text-sm text-gray-500">
                    From {new Date(item.startDate).toLocaleDateString()} to {new Date(item.endDate).toLocaleDateString()} ({item.rentalDuration} days)
                  </p>
                  
                  <div className="flex flex-wrap items-end justify-between mt-4">
                    <div className="flex items-center mr-4 mb-2 sm:mb-0">
                      <p className="mr-3 text-sm font-medium text-gray-700">Quantity:</p>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          className="px-2 py-1"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          className="px-2 py-1"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-brand-red">
                        ₹{item.product.price * item.quantity * item.rentalDuration}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.product.price} × {item.quantity} {item.quantity > 1 ? 'items' : 'item'} × {item.rentalDuration} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="border rounded-md p-4 bg-gray-50 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="mt-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                Apply Coupon
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline" className="rounded-l-none">Apply</Button>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full mt-6 bg-brand-red hover:bg-brand-red/90"
            >
              Proceed to Checkout
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Secured by RentThreads India Payment Protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
