import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../App';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  total: number;
  onCheckout: () => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  total,
  onCheckout
}: ShoppingCartProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-pink-600" />
                  <h2 className="text-pink-600">Shopping Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-pink-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-pink-200 mb-4" />
                  <p className="text-gray-600 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some beautiful products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-pink-50 rounded-xl p-4 border border-pink-100"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-pink-600 mb-3">${item.price.toFixed(2)}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-200">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-pink-50 rounded-l-lg transition-colors"
                              >
                                <Minus className="w-4 h-4 text-pink-600" />
                              </button>
                              <span className="px-3 text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-pink-50 rounded-r-lg transition-colors"
                              >
                                <Plus className="w-4 h-4 text-pink-600" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => onRemove(item.id)}
                              className="p-2 hover:bg-pink-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-pink-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-pink-100 bg-gradient-to-r from-pink-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </motion.button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}