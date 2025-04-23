import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-serif font-bold text-brand-red">Trend</span>
              <span className="text-xl font-serif font-bold text-white">Lend</span>
              <span className="text-xs font-medium text-brand-gray ml-1">India</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              India's premier fashion rental service. Rent designer clothes, accessories,
              and more at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-sm text-gray-300 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-us" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-gray-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-sm text-gray-300 mb-2">
                123 Fashion Street, Bangalore, Karnataka, India - 560001
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@rentthreadsindia.com" className="hover:text-white transition-colors">
                  info@rentthreadsindia.com
                </a>
              </p>
              <p className="text-sm text-gray-300">
                <strong>Phone:</strong>{" "}
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              © {currentYear} RentThreads India. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <img 
                src="https://www.investopedia.com/thmb/eDFY1_Ih-BIQhWXTpID62Jh-Jtw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IndianPaymentKMP1-8b5d5bf05c604fbdb418a8c3820091a7.png" 
                alt="Payment Methods" 
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
