
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products, sampleReviews } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  // Find the product
  const product = products.find(p => p.id === id);
  
  // State variables
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string, code: string }>(
    { name: "", code: "" }
  );
  const [rentalDuration, setRentalDuration] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Set defaults
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      if (product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      // Set default dates (today + rental duration)
      const today = new Date();
      setStartDate(today.toISOString().split('T')[0]);
      
      const endDateObj = new Date();
      endDateObj.setDate(today.getDate() + rentalDuration);
      setEndDate(endDateObj.toISOString().split('T')[0]);
    }
  }, [product, rentalDuration]);

  // Recalculate end date when start date or duration changes
  useEffect(() => {
    if (startDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setDate(startDateObj.getDate() + rentalDuration);
      setEndDate(endDateObj.toISOString().split('T')[0]);
    }
  }, [startDate, rentalDuration]);

  // Handlers
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(
      product,
      1,
      selectedSize,
      selectedColor,
      rentalDuration,
      startDate,
      endDate
    );
    
    // Show a toast notification
    alert("Added to cart successfully!");
  };

  const handleRentNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
  };

  const handleUpdateDuration = (days: number) => {
    if (days < 1) days = 1;
    if (days > 30) days = 30;
    setRentalDuration(days);
  };

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Product not found</h1>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`aspect-square border-2 ${selectedImage === image ? 'border-brand-red' : 'border-transparent'}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-serif font-bold text-brand-black">{product.name}</h1>
          <p className="text-brand-gray mt-1">{product.brand}</p>
          
          <div className="flex items-center mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg 
                  key={index}
                  className={`w-4 h-4 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-brand-red">₹{product.price}</span>
              <span className="text-sm text-gray-500 ml-2">/ day</span>
            </div>
            {product.originalPrice && (
              <p className="mt-1 text-sm text-gray-500">
                Original Value: <span className="line-through">₹{product.originalPrice}</span>
                {" "}<span className="text-brand-red font-medium">
                  ({Math.round((1 - product.price / product.originalPrice) * 100)}% cheaper to rent)
                </span>
              </p>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`border py-2 text-sm rounded-md ${
                      selectedSize === size 
                        ? 'border-brand-red bg-brand-red text-white' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex space-x-2 mt-2">
                {product.colors.map(color => (
                  <button
                    key={color.code}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.code === color.code 
                        ? 'border-gray-600' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">Selected: {selectedColor.name}</p>
            </div>
          )}

          {/* Rental Duration */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Rental Duration</h3>
            <div className="flex items-center mt-2">
              <button 
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                onClick={() => handleUpdateDuration(rentalDuration - 1)}
                disabled={rentalDuration <= 1}
              >
                -
              </button>
              <span className="mx-4 font-medium">{rentalDuration} days</span>
              <button 
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                onClick={() => handleUpdateDuration(rentalDuration + 1)}
                disabled={rentalDuration >= 30}
              >
                +
              </button>
            </div>
          </div>

          {/* Rental Dates */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Rental Dates</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm bg-gray-50"
                  value={endDate}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-100">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rental Cost:</span>
              <span className="text-sm font-medium">₹{product.price} × {rentalDuration} days</span>
            </div>
            <div className="flex justify-between mt-2 border-t border-gray-200 pt-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-brand-red">₹{product.price * rentalDuration}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleRentNow}
              variant="default"
              className="w-full bg-brand-red hover:bg-brand-red/90"
            >
              Rent Now
            </Button>
          </div>

          <button 
            onClick={handleWishlist} 
            className="mt-4 flex items-center justify-center text-sm text-gray-500 hover:text-brand-red w-full py-2"
          >
            <Heart className={`w-4 h-4 mr-2 ${isInWishlist(product.id) ? 'fill-brand-red text-brand-red' : ''}`} />
            {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-xl font-serif font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {sampleReviews
            .filter(review => review.productId === product.id)
            .map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg 
                        key={index}
                        className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm font-medium">{review.userName}</p>
                  <span className="mx-2 text-gray-300">•</span>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
