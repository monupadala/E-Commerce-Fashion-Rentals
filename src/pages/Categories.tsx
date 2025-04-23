
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Browse Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/category/${category.slug}`}
            className="group"
          >
            <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h2 className="text-white text-xl font-medium mb-1">{category.name}</h2>
                <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
