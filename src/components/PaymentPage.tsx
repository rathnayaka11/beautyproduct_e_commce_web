import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { CartItem } from '../App';

interface PaymentPageProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
}

export function PaymentPage({ items, total, onBack }: PaymentPageProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 3);
    setCvv(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
  };

  const subtotal = total;
  const shipping = 10;
  const tax = total * 0.08;
  const finalTotal = subtotal + shipping + tax;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-pink-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          
          <div className="bg-pink-50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-pink-600">${finalTotal.toFixed(2)}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-pink-600">Secure Payment</h2>
                  <p className="text-sm text-gray-500">Your information is encrypted</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-4 pl-12 bg-pink-50 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-4 bg-pink-50 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-4 py-4 bg-pink-50 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      required
                      className="w-full px-4 py-4 bg-pink-50 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Credit Card Visual */}
                <div className="relative h-52 mt-8">
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 10 }}
                    className="absolute inset-0 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-2xl shadow-2xl p-6 text-white"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg opacity-80"></div>
                      <CreditCard className="w-10 h-10 opacity-80" />
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-xl tracking-wider">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-70 mb-1">CARDHOLDER</p>
                        <p className="text-sm">
                          {cardName || 'YOUR NAME'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-70 mb-1">EXPIRES</p>
                        <p className="text-sm">
                          {expiryDate || 'MM/YY'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${finalTotal.toFixed(2)}
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  🔒 Your payment information is secure and encrypted
                </p>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100 sticky top-24">
              <h3 className="text-pink-600 mb-6">Order Summary</h3>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-pink-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-pink-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-pink-100 pt-3 flex justify-between">
                  <span className="text-gray-800">Total</span>
                  <span className="text-pink-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-pink-100">
                <p className="text-xs text-gray-500 text-center mb-3">We Accept</p>
                <div className="flex justify-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center text-white text-xs">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs">
                    AMEX
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
