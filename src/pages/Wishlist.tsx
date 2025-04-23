
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, X, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  // Mock wishlist data - in a real app this would come from a context or API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Designer Saree",
      brand: "Sabyasachi",
      price: 1200,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
      available: true,
    },
    {
      id: "2",
      name: "Men's Suit",
      brand: "Raymond",
      price: 2500,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
      available: true,
    },
    {
      id: "3",
      name: "Lehenga",
      brand: "Manish Malhotra",
      price: 3000,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
      available: false,
    },
    {
      id: "4",
      name: "Wedding Sherwani",
      brand: "Manyavar",
      price: 3500,
      image: "https://lovable.dev/opengraph-image-p98pqg.png",
      available: true,
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addToCart = (id: string) => {
    // In a real app, this would add the item to the cart context
    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="text-gray-600 border-gray-300"
          >
            Clear All
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Heart className="h-16 w-16 mx-auto text-gray-300" />
          <h2 className="text-xl font-medium mt-4 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Add items you love to your wishlist. Review them anytime and easily move them to your cart.</p>
          <Button asChild className="bg-brand-red hover:bg-brand-red/90">
            <Link to="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-sm border overflow-hidden relative group"
            >
              {/* Remove button */}
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
              
              <Link to={`/product/${item.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                </Link>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-brand-red">₹{item.price}</span>
                    <span className="text-xs text-gray-500">/day</span>
                  </div>
                  <div>
                    {item.available ? (
                      <span className="text-xs text-green-600">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={() => addToCart(item.id)}
                  disabled={!item.available}
                  className="w-full mt-3 bg-brand-red hover:bg-brand-red/90 disabled:bg-gray-200"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> 
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
