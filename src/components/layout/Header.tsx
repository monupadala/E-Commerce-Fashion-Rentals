
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-brand-red">Rent</span>
            <span className="text-2xl font-serif font-bold text-brand-black">Threads</span>
            <span className="hidden sm:inline-block text-sm font-medium text-brand-gray ml-2">India</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-brand-black hover:text-brand-red font-medium transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-brand-black hover:text-brand-red font-medium transition-colors">
              Categories
            </Link>
            <Link to="/new-arrivals" className="text-brand-black hover:text-brand-red font-medium transition-colors">
              New Arrivals
            </Link>
            <Link to="/trending" className="text-brand-black hover:text-brand-red font-medium transition-colors">
              Trending
            </Link>
          </nav>

          {/* Search, Cart, User - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-48 lg:w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand-red text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.firstName} {user?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">My Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-brand-red text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4 animate-fade-in">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/categories" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/new-arrivals" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                New Arrivals
              </Link>
              <Link to="/trending" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                Trending
              </Link>
              <Link to="/wishlist" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                My Wishlist
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                    My Account
                  </Link>
                  <Link to="/orders" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                    My Orders
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start p-0 text-brand-black hover:text-brand-red py-1 font-medium"
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" className="text-brand-black hover:text-brand-red py-1 font-medium" onClick={toggleMenu}>
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
