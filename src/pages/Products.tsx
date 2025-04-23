
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/mockData";

export default function ProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  
  let pageTitle = "All Products";
  let displayProducts = [...products];
  
  // Filter by category if provided
  if (slug) {
    const category = categories.find(cat => cat.slug === slug);
    if (category) {
      pageTitle = category.name;
      displayProducts = products.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
    }
  }
  
  // Filter by search query if provided
  if (query) {
    pageTitle = `Search Results: "${query}"`;
    displayProducts = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
  
  // Handle trending page
  if (window.location.pathname === '/trending') {
    pageTitle = "Trending Products";
    displayProducts = products.filter(p => p.trending);
  }
  
  // Handle new arrivals
  if (window.location.pathname === '/new-arrivals') {
    pageTitle = "New Arrivals";
    // Sort by date and take most recent
    displayProducts = [...products].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 12);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-6">{pageTitle}</h1>
      
      {displayProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow">
              <a href={`/product/${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
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
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
