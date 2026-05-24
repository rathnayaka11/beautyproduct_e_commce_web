import { useState, useEffect } from 'react';
import { SakuraHero } from './components/SakuraHero';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingCart } from './components/ShoppingCart';
import { PaymentPage } from './components/PaymentPage';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { SakuraLogo } from './components/SakuraLogo';
import { Facebook, Instagram } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowPayment(true);
    window.scrollTo(0, 0);
  };

  const handleBackFromPayment = () => {
    setShowPayment(false);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Show payment page
  if (showPayment) {
    return (
      <PaymentPage
        items={cartItems}
        total={cartTotal}
        onBack={handleBackFromPayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SakuraLogo className="w-10 h-10" />
            <h1 className="text-pink-600">Sakura Beauty</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-pink-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <CartIcon className="w-6 h-6 text-pink-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sakura Hero Section */}
      <SakuraHero scrollY={scrollY} />

      {/* Products Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-pink-600 mb-4">Our Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium beauty products, inspired by the delicate beauty of sakura blossoms
          </p>
        </div>
        <ProductGrid onAddToCart={addToCart} />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <SakuraLogo className="w-12 h-12" />
                <h3 className="text-pink-600"> Sakura Beauty</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Blossoming Beauty, Naturally Yours
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Shipping Info</a></li>
                <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Returns</a></li>
              </ul>
            </div>
            
            {/* Follow Us */}
            <div>
              <h4 className="text-gray-800 mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-pink-100 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 Sakura Beauty. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={handleCheckout}
      />
    </div>
  );
}