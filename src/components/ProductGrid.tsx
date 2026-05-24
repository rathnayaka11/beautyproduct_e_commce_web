import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

// Image URLs pool
const imageUrls = [
  'https://images.unsplash.com/photo-1686121522744-dc323ce3fb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3Njc0MzE2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1763503836825-97f5450d155a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjczMjI3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbGlwc3RpY2slMjBjb3NtZXRpY3xlbnwxfHx8fDE3Njc0MzE2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3Njc0MTM3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1676347929093-6614fb45bd90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwcGlua3xlbnwxfHx8fDE3Njc0MzE2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1629732047356-30c7e14e712b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBjcmVhbSUyMHNraW5jYXJlfGVufDF8fHx8MTc2NzQzMTY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1684244110880-b7dda6c68618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBwYWxldHRlJTIwY29zbWV0aWN8ZW58MXx8fHwxNzY3NDMyOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1575686717697-f43bd36e74c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZm91bmRhdGlvbiUyMGJvdHRsZXxlbnwxfHx8fDE3Njc0MzI5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1632147340366-2756f13bfafc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVzaCUyMG1ha2V1cCUyMGNvc21ldGljfGVufDF8fHx8MTc2NzQzMjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1556227703-ab57dbc6f839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHRvbmVyJTIwYm90dGxlfGVufDF8fHx8MTc2NzMzMDEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1736753365978-0b5090f90095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJydXNoJTIwc2V0fGVufDF8fHx8MTc2NzQzMjkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1692881423829-9a2f80d7a84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwcG9saXNoJTIwcGlua3xlbnwxfHx8fDE3Njc0MzI5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNpbmclMjBmb2FtJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY3NDMyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1594332322527-08753d4473c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBza2luY2FyZSUyMGJvdHRsZXxlbnwxfHx8fDE3Njc0MzI5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
];

const productTemplates = [
  { name: 'Sakura Essence Serum', category: 'Serum', description: 'Lightweight serum infused with sakura extract for radiant skin', basePrice: 68 },
  { name: 'Cherry Blossom Cream', category: 'Moisturizer', description: 'Rich moisturizing cream with natural cherry blossom petals', basePrice: 52 },
  { name: 'Petal Pink Lipstick', category: 'Makeup', description: 'Creamy lipstick with a soft pink hue inspired by sakura petals', basePrice: 32 },
  { name: 'Sakura Sheet Mask', category: 'Mask', description: 'Hydrating sheet mask enriched with sakura and hyaluronic acid', basePrice: 24 },
  { name: 'Blossom Eau de Parfum', category: 'Fragrance', description: 'Delicate floral fragrance capturing the essence of spring', basePrice: 95 },
  { name: 'Radiance Eye Cream', category: 'Eye Care', description: 'Anti-aging eye cream with sakura extract and vitamin C', basePrice: 58 },
  { name: 'Rose Petal Palette', category: 'Makeup', description: 'Eyeshadow palette with 12 romantic pink and nude shades', basePrice: 45 },
  { name: 'Dewy Foundation', category: 'Makeup', description: 'Luminous foundation for a natural, glowing finish', basePrice: 42 },
  { name: 'Cherry Blush Duo', category: 'Makeup', description: 'Powder blush duo in complementary pink shades', basePrice: 28 },
  { name: 'Hydrating Toner', category: 'Toner', description: 'Refreshing toner with rose water and hyaluronic acid', basePrice: 35 },
  { name: 'Professional Brush Set', category: 'Tools', description: 'Complete 10-piece makeup brush collection', basePrice: 78 },
  { name: 'Blossom Nail Polish', category: 'Nails', description: 'Long-lasting nail polish in soft pink shade', basePrice: 18 },
  { name: 'Foaming Cleanser', category: 'Cleanser', description: 'Gentle cleansing foam that removes impurities', basePrice: 29 },
  { name: 'SPF 50 Sunscreen', category: 'Suncare', description: 'Lightweight sun protection with anti-aging benefits', basePrice: 38 },
  { name: 'Vitamin C Serum', category: 'Serum', description: 'Brightening serum with 20% vitamin C complex', basePrice: 72 },
  { name: 'Night Recovery Cream', category: 'Moisturizer', description: 'Intensive overnight treatment for skin renewal', basePrice: 64 },
  { name: 'Lip Gloss Set', category: 'Makeup', description: 'Collection of 3 high-shine lip glosses', basePrice: 36 },
  { name: 'Exfoliating Scrub', category: 'Exfoliant', description: 'Gentle sugar scrub with sakura oil', basePrice: 32 },
  { name: 'Micellar Water', category: 'Cleanser', description: 'All-in-one makeup remover and cleanser', basePrice: 26 },
  { name: 'Setting Spray', category: 'Makeup', description: 'Long-wear makeup setting mist', basePrice: 30 },
];

// Generate 100 products
const products: Product[] = [];
for (let i = 0; i < 100; i++) {
  const template = productTemplates[i % productTemplates.length];
  const imageUrl = imageUrls[i % imageUrls.length];
  const variation = Math.floor(i / productTemplates.length) + 1;
  const suffix = variation > 1 ? ` ${variation}` : '';
  
  products.push({
    id: i + 1,
    name: template.name + suffix,
    price: template.basePrice + (Math.random() * 20 - 10),
    image: imageUrl,
    description: template.description,
    category: template.category
  });
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-white">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                {product.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-pink-600">${product.price.toFixed(2)}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddToCart(product)}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}