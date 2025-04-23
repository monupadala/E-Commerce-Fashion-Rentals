
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners, categories, products } from "@/data/mockData";

export default function Index() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.filter(product => product.featured);
  const trendingProducts = products.filter(product => product.trending).slice(0, 8);
  
  // Banner auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
            style={{
              zIndex: index === currentBanner ? 10 : 0
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${banner.imageUrl})` 
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="max-w-xl text-white relative z-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-xl mb-8">{banner.subtitle}</p>
                <Button 
                  asChild 
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                  size="lg"
                >
                  <Link to={banner.linkTo}>
                    Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Banner indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentBanner ? "bg-white w-8" : "bg-white/50"
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-2">Shop by Category</h2>
          <p className="text-gray-600 mb-8">Find the perfect outfit for every occasion</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="relative group overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Trending Now</h2>
              <p className="text-gray-600">Our most popular rental products this season</p>
            </div>
            <Link to="/trending" className="flex items-center text-brand-red hover:underline font-medium">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/placeholder.svg';
                    }}
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-brand-red text-white text-xs px-2 py-1 rounded-sm">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-700 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">{product.brand}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <span className="text-lg font-bold text-brand-red">₹{product.price}</span>
                      <span className="text-xs text-gray-500">/day</span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-600 text-center mb-12">Easy steps to rent fashion with us</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-lg mb-2">Select Your Outfit</h3>
              <p className="text-gray-600">Browse and choose from our extensive collection of designer wear</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-lg mb-2">Pick Rental Duration</h3>
              <p className="text-gray-600">Select the dates you need the outfit for and complete payment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-lg mb-2">Receive & Return</h3>
              <p className="text-gray-600">Get your outfit delivered and return it when you're done</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-brand-red hover:bg-brand-red/90" size="lg">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-2">Our Happy Customers</h2>
          <p className="text-gray-600 text-center mb-12">What people are saying about us</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"I rented a lehenga for my friend's wedding and received so many compliments. The quality was amazing and the rental process was seamless!"</p>
              <p className="font-bold">Priya Sharma</p>
              <p className="text-sm text-gray-500">Delhi</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"RentThreads saved me so much money! I needed a suit for an important business meeting and found the perfect one. Great quality and service."</p>
              <p className="font-bold">Raj Kumar</p>
              <p className="text-sm text-gray-500">Mumbai</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"Love the concept! I rented a designer saree for a family function that I would never have been able to afford otherwise. Will definitely use again!"</p>
              <p className="font-bold">Anjali Patel</p>
              <p className="text-sm text-gray-500">Bangalore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-l-md text-black"
                required
              />
              <Button type="submit" className="rounded-l-none bg-brand-red hover:bg-brand-red/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
