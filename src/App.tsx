import { Home, Search, ShoppingBag, User, Mail, Share2, ChevronLeft, ChevronRight, X, Lock, Eye, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// --- Types ---
type Season = 'All' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

interface Product {
  id: number;
  name: string;
  collection: string;
  price: number;
  image: string;
  season: Season;
  description?: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Amber Glass Vase",
    collection: "Autumn Collection",
    price: 45.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGrLf1u3T-q4grXZjkokAu5ZafxJUW7upfBVkkP_WKnVP5xWgeD4SxUSoMJqA-vZicLOf4GzVh1XlTUn5Vj4G1EjWVzHR-cEIQFTwMU2ELi0QfDS4UxemEa3vW049QumeX5JudAZiWAsE5X6H7oiU-gNbn922W40Bb9BEx6bK1cGXXQzxg1594qHrgMYTm3v6b296WZP7PzAWaZ41_ZIGEt7Bmzjo18SWOV1_NDIu6VMrXy2HPQkf1qMdY97yighUo19vJjWeyUA8H",
    season: "Autumn",
    description: "A hand-blown amber glass vase that captures the warm glow of autumn light. Perfect for dried botanicals or as a standalone statement piece."
  },
  {
    id: 2,
    name: "Terracotta Cushion Set",
    collection: "Autumn Collection",
    price: 38.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg9h9wzFcbjZ1FwO3FzLIlyGxNGRBGnTSe1kknpbGHMlaxjCj1y4VuLTzud-DrA8uv4wy6CDe3w5pMJQfQWAPWVGW31t8Cyj73NX--2uTNkVeOIuNZy_elHtqECVeDjIR8Rdz7YiO_0wgSOAg8rKxPYKnNyfN7v493JNZeWtYC74oUi7vGMhVyrlDOg7On4zr0Uo-EUhAbIBYaxYEt3cBzbN3y9VIT4yGuRgRftX2FNjmDLgRSbCWn1323ZqHY023jp9mwYeHJKlT7",
    season: "Autumn",
    description: "Soft, textured cotton cushions in a rich terracotta hue. These cushions add warmth and comfort to any seating area."
  },
  {
    id: 3,
    name: "Spiced Cedar Candle",
    collection: "Autumn Collection",
    price: 24.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeelpC3T2gU2-G7j_O6y665K5MrkiQxI7FsAVeuekpIPJiKIhjuif4C_NoGLnGxfQijO1OgB35a_G0iKJVBSD6fqjtPPQ1Hm4bh937dcEmCz_Ux6Yv_2M7yMsE4TuPyRBdVa_TgE3YoLYq4ihNDfzf_BW3b6h1kjFQbO4ffVSQcOS0MxYz7Lu5G_4EhcoiUmBuAX6NvXtw2ddowo0hVS4Ly1bHEvwc3Rm_-IP_E_TqwQrxJAteqNybnUfLV_0IWo67FHa46RQ-_XUO",
    season: "Autumn",
    description: "Hand-poured soy wax candle with notes of cedarwood, clove, and orange peel. Housed in a reusable glass jar."
  },
  {
    id: 4,
    name: "Pastel Linen Throw",
    collection: "Spring Collection",
    price: 65.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpF7YDk2tEbonqZ7Km_n4C3VLicq9FnC9ITRkKAbUOefbCxzf6kEOnms1Pe3XELgh278HWRAMGLnwMBL1ugTBMQi911vNtuwXMRPRw_zR60qR8Hfop-dh6uLO1djgs3Vgjmyl9Uqt7wLGT4HXl1jsA24FTs6WWDuLBQRw41PcSrXZ5A9N8tS4G5pBNrwc2gn5YusDhU7R6KW9HdSaIl9Z40FyO7h6EkiSA-is_M9jLZtqVJJLw3I_025X5owIyBmufrVyRs4at7Oj1",
    season: "Spring",
    description: "Lightweight linen throw in a soft pastel blue. Ideal for cool spring evenings and adding a touch of color to your home."
  },
  {
    id: 5,
    name: "Floral Ceramic Pot",
    collection: "Spring Collection",
    price: 32.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmtceuAP7U0wkVvDh1VOfFTKoYaMqJrPXiKddXiTqW-IUdUBAL57vNj07AUy_u-9PjWKRySxN-xV8XUdec6erZ1Tk7PHFP2tAyEo3Wn_I6FxEstKQnS30mB6i8WI58ezn2mJf81KOMWboeq4AJYpV3eOTg0yfjzVYU7UoStE-QLYbRP3fKuQRj7VLAFDrFIRqjQyLeK8g3K1TNTju6y1B4FjLi9zqM1Fq3F_Zd8z4NIRI9tap7j18HNO5lF7sA8JAHf5p07tJFn06P",
    season: "Spring",
    description: "Hand-painted ceramic pot with delicate floral motifs. A charming home for your favorite indoor plants."
  },
  {
    id: 6,
    name: "Handwoven Rattan Basket",
    collection: "All Seasons",
    price: 55.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRWI8BGZHgtwZXx9rKDNCBQk2_D2zJCRiIqmNrIacQ3amiv--HsXOuUBZFQPQ25tJqZ9K5OnFaceXx-MHw7JUnF4OwiIza_iHX6sTBTbVRJ90yfuvpZ-NX5mYTeoDl6QkJGY1f4E3Cw8LInEs3Ohq-CUHbqRoWu0EhVskxBWdTgNHBHoyFLJfZBYAK77xI0FOhYhsNVCeyEf0whDE2CXy8QJnBfOILAsBXgcHSVLDrVzuFhtb7MKrmAnb1EvTxGQ24E2XKBNQhUyOG",
    season: "All",
    description: "Versatile handwoven rattan basket. Perfect for storing blankets, magazines, or as a decorative floor piece."
  },
  {
    id: 7,
    name: "Chunky Knit Blanket",
    collection: "Winter Collection",
    price: 120.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrtZFT1gNVyNbIEszCFgmYuS-BDAxbB6Xi6UAtApNzUhelHCLKUvvqh7n0K6rwUcmkSdxUS_9jAyYKEISYq56FP0goAD6TRp_8WQnlCy24GvkVcK9nuo46cN17bYFXAvNsEOryI7BZMLeqyIJ6Juq8qnW3u_P2BP7F-tLBfoqlwO0nN_ZL6o5piF2C06lsBL5cag064UuMCFSlR6xLFxlxEdFLtR2GVYujbHGfhBbBt-InrJgmKuLeAncMlvhBdIpFcZB90NUYA1t",
    season: "Winter",
    description: "Ultra-soft chunky knit blanket in ivory. The ultimate winter essential for cozy nights in."
  },
  {
    id: 8,
    name: "Driftwood Serving Tray",
    collection: "Summer Collection",
    price: 78.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBio1SlJUnzYfszy4x_UFi_0kuz3gl3a1B7q6mnd2sQBqlFEfuCWJHzjcT_nyphAfDaRiNSeFLirbpDrL_iIk45P9pqKKreB1WKaxlzmSLvtcbeM8jXG0nbMDD4S7M-wZdyoroKcZZganTUx7qppK2et_2C5yI9L2js7m9W_ZlmNz5AZ1StrvHUiVQkU3DksgU-Yhle-eggfOH1CGeLRkLFa_DYtJTnXz6eFccmtcFkMIUfC_-bSdzgVMV3zAs-wJlGKBGhEA1lZPTO",
    season: "Summer",
    description: "Natural driftwood serving tray with a weathered finish. Brings a touch of coastal elegance to your summer gatherings."
  }
];

// --- Components ---

const SeasonSwitcher = () => {
  const { season, manualSeason, setManualSeason } = useTheme();

  return (
    <div className="relative group flex items-center">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors font-medium text-xs uppercase tracking-widest text-slate-600 bg-white">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        {manualSeason ? `Override: ${manualSeason}` : `Season: ${season}`}
      </button>
      <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden z-50">
        <button onClick={() => setManualSeason(null)} className={`text-left px-4 py-2 text-sm hover:bg-slate-50 ${!manualSeason ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}`}>Auto Detect</button>
        <button onClick={() => setManualSeason('spring')} className={`text-left px-4 py-2 text-sm hover:bg-slate-50 ${manualSeason === 'spring' ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}`}>Spring</button>
        <button onClick={() => setManualSeason('summer')} className={`text-left px-4 py-2 text-sm hover:bg-slate-50 ${manualSeason === 'summer' ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}`}>Summer</button>
        <button onClick={() => setManualSeason('autumn')} className={`text-left px-4 py-2 text-sm hover:bg-slate-50 ${manualSeason === 'autumn' ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}`}>Autumn</button>
        <button onClick={() => setManualSeason('winter')} className={`text-left px-4 py-2 text-sm hover:bg-slate-50 ${manualSeason === 'winter' ? 'text-primary font-bold bg-primary/5' : 'text-slate-600'}`}>Winter</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center transition-colors duration-500">
            <Home size={20} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">
            Hearth <span className="text-primary transition-colors duration-500">&amp;</span> Home
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: 'Catalog', path: '/catalog' },
            { name: 'Collections', path: '/collections' },
            { name: 'About', path: '/about' },
            { name: 'Journal', path: '/journal' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-semibold transition-all relative py-2 group ${location.pathname === item.path ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-colors duration-500"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-4 py-2 gap-3 w-64 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search stories..."
              className="bg-transparent text-sm w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <SeasonSwitcher />
            <button className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full transition-colors duration-500"></span>
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
              <Link to="/signin">
                <User size={20} />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const QuickViewModal = ({ product, onClose }: { product: Product, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="bg-background-light rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row transition-colors duration-500"
      onClick={e => e.stopPropagation()}
    >
      <div className="md:w-1/2 aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="md:w-1/2 p-10 flex flex-col justify-center relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-200/50 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        <div className="space-y-6">
          <div>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2 transition-colors duration-500">{product.collection}</p>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-2xl font-medium text-slate-800 mt-2">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {product.description || "Thoughtfully designed and ethically sourced home goods for every corner of your life."}
          </p>
          <div className="pt-4">
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProductCard = ({ product, onQuickView }: { product: Product, onQuickView: (p: Product) => void }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="group cursor-pointer transition-all duration-500"
  >
    <div className="relative aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
      <img
        src={product.image}
        alt={product.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onQuickView(product);
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:bg-primary hover:text-white"
      >
        Quick View
      </button>
    </div>
    <div className="flex justify-between items-start px-1">
      <div>
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{product.name}</h3>
        <p className="text-sm text-slate-500">{product.collection}</p>
      </div>
      <span className="text-primary font-bold transition-colors duration-500">${product.price.toFixed(2)}</span>
    </div>
  </motion.div>
);

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const seasonParam = searchParams.get('season') as Season;
  const [activeSeason, setActiveSeason] = useState<Season>(seasonParam || 'All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync state with URL param
  useEffect(() => {
    if (seasonParam) {
      setActiveSeason(seasonParam);
    } else {
      setActiveSeason('All');
    }
  }, [seasonParam]);

  const handleSeasonChange = (season: Season) => {
    setActiveSeason(season);
    if (season === 'All') {
      searchParams.delete('season');
    } else {
      searchParams.set('season', season);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = activeSeason === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.season === activeSeason || p.season === 'All');

  const seasons: Season[] = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-16 text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Seasonal Home Decor
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed"
        >
          Elevate your living space with our curated collection of artisanal home goods, designed to change with the rhythms of the year.
        </motion.p>
      </section>

      <div className="flex flex-col items-center gap-8 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-background-light rounded-xl shadow-sm border border-primary/10 transition-colors duration-500">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => handleSeasonChange(season)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeSeason === season
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-primary/10 text-slate-600'
                }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} onQuickView={setSelectedProduct} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 flex justify-center items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:bg-primary/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors font-medium ${page === 1 ? 'bg-primary text-white font-bold' : 'hover:bg-primary/10'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:bg-primary/10 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const HomePage = () => {
  const { season } = useTheme();

  // These use the AI generated hero banners located outside the src/ dir, handled by pulling them in via absolute URIs or moving them.
  // We'll move them to public folder first in a subsequent tool call. 
  // Let's use paths relative to /public which Vite will serve directly.
  const heroImages = {
    winter: "/winter_hero.png",
    spring: "/spring_hero.png",
    summer: "/summer_hero.png",
    autumn: "/autumn_hero.png"
  };

  const featuredCollections = [
    {
      name: 'Summer Collection',
      description: 'Bright colors and coastal vibes for sun-drenched days.',
      image: 'https://picsum.photos/seed/summer-featured/800/600',
      path: '/collections/summer'
    },
    {
      name: 'Autumn Collection',
      description: 'Warm tones and cozy textures for the golden season.',
      image: 'https://picsum.photos/seed/autumn-featured/800/600',
      path: '/catalog?season=Autumn'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            key={season} // Causes exit/enter animation on source swap
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src={heroImages[season] || heroImages.winter}
            alt={`${season} home inspiration`}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl space-y-8"
          >
            <h2 className="text-7xl font-extrabold leading-tight tracking-tighter">
              Crafted for the <span className="text-primary italic transition-colors duration-500">Rhythms</span> of Life
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Welcome to Hearth & Home. We believe your living space should evolve with you. Discover our curated collections of artisanal goods designed to bring warmth and intention to every season.
            </p>
            <div className="flex gap-4">
              <Link to="/catalog" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Explore Catalog
              </Link>
              <Link to="/about" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Curated Edits</p>
            <h3 className="text-4xl font-bold">Featured Collections</h3>
          </div>
          <Link to="/collections" className="text-primary font-bold hover:underline">View All Collections</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
            >
              <Link to={collection.path}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h4 className="text-3xl font-bold text-white mb-2">{collection.name}</h4>
                  <p className="text-white/80 max-w-xs">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brief Introduction */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-primary/5 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-4xl font-bold leading-tight">Artisanal quality, ethically sourced.</h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              At Hearth & Home, we partner with independent makers to bring you unique pieces that stand the test of time. Every item in our catalog is chosen for its craftsmanship and its ability to transform a house into a home.
            </p>
            <Link to="/about" className="inline-flex items-center text-primary font-bold group">
              Learn more about our mission
              <ChevronRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/intro1/400/400" className="rounded-2xl" alt="Craft detail" />
            <img src="https://picsum.photos/seed/intro2/400/400" className="rounded-2xl mt-8" alt="Home detail" />
          </div>
        </div>
      </section>
    </div>
  );
};

const JournalPage = () => {
  const articles = [
    {
      category: 'DESIGN TIPS',
      title: 'Minimalist Dining: The Power of Wood',
      excerpt: 'Why natural materials are becoming the centerpiece of modern sustainable home design. Exploring the longevity of oak and walnut finishes.',
      date: 'SEPT 12, 2023',
      image: 'https://picsum.photos/seed/journal1/800/600'
    },
    {
      category: 'ATMOSPHERE',
      title: 'Lighting Your Sanctuary',
      excerpt: 'The science of warm light and how it affects our evening mood and productivity. Creating layers of light in your bedroom.',
      date: 'SEPT 08, 2023',
      image: 'https://picsum.photos/seed/journal2/800/600'
    },
    {
      category: 'COLLECTIONS',
      title: "The Ceramicist's Touch",
      excerpt: 'A behind-the-scenes look at our latest artisanal pottery collection. Each piece tells a unique story of craft and patience.',
      date: 'AUG 30, 2023',
      image: 'https://picsum.photos/seed/journal3/800/600'
    },
    {
      category: 'LIVING',
      title: 'Linen and Wool: Layering for Winter',
      excerpt: 'Mastering the art of textile layering. How to mix patterns and textures without overwhelming your space.',
      date: 'AUG 24, 2023',
      image: 'https://picsum.photos/seed/journal4/800/600'
    },
    {
      category: 'NATURE',
      title: 'Bringing the Outside In',
      excerpt: 'Indoor gardening for urban dwellers. Low-maintenance plants that thrive in indirect light and purify your air.',
      date: 'AUG 19, 2023',
      image: 'https://picsum.photos/seed/journal5/800/600'
    },
    {
      category: 'WORKPLACE',
      title: 'The Mindful Home Office',
      excerpt: 'Ergonomics meets aesthetics. Redesigning your workspace to foster creativity and reduce physical fatigue.',
      date: 'AUG 15, 2023',
      image: 'https://picsum.photos/seed/journal6/800/600'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Featured Editorial Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[60vh] rounded-[2.5rem] overflow-hidden group cursor-pointer"
        >
          <img
            src="https://picsum.photos/seed/journal-hero/1600/900"
            alt="Featured Editorial"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end max-w-3xl space-y-6">
            <span className="bg-primary/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded w-fit">
              Featured Editorial
            </span>
            <h2 className="text-5xl font-bold text-white leading-tight">
              The Art of Seasonal Living: Embracing Autumn
            </h2>
            <p className="text-white/80 text-lg leading-relaxed line-clamp-2">
              Discover how to transform your space with warm textures, earthy tones, and the gentle glow of candlelight as we transition into the...
            </p>
            <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
              <span>September 15, 2023</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>8 min read</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Stories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-bold">Recent Stories</h3>
          <div className="flex bg-slate-100 p-1 rounded-full">
            <button className="px-6 py-2 bg-white rounded-full text-xs font-bold shadow-sm">Latest</button>
            <button className="px-6 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Trending</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                  {article.category}
                </span>
                <h4 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {article.date}
                  </span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center group/link">
                    Read More
                    <ChevronRight size={14} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 text-center space-y-6">
          <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Load More Stories
          </button>
          <p className="text-xs text-slate-400 font-medium">Showing 6 of 42 articles</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 rounded-[3rem] p-20 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-4xl font-bold">Stay Inspired</h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              Join our community of home lovers and receive weekly design inspiration, early access to collections, and seasonal guides.
            </p>
          </div>
          <form className="max-w-md mx-auto flex gap-3" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white border border-slate-200 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
const Footer = () => (
  <footer className="bg-white py-12 border-t border-primary/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
          <Home size={18} />
        </div>
        <h2 className="text-lg font-extrabold tracking-tight uppercase">Hearth &amp; Home</h2>
      </div>

      <p className="text-xs text-slate-400 font-medium order-3 md:order-2">
        © 2023 Hearth &amp; Home Design Studio. All rights reserved.
      </p>

      <div className="flex gap-6 text-slate-400 order-2 md:order-3">
        <a href="#" className="hover:text-primary transition-colors">
          <Home size={18} />
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          <Share2 size={18} />
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          <Mail size={18} />
        </a>
      </div>
    </div>
  </footer>
);

const CollectionsPage = () => {
  const collections = [
    {
      name: 'Spring Collection',
      description: 'Fresh beginnings and floral accents for a renewed home.',
      image: 'https://picsum.photos/seed/spring-home/800/1000',
      season: 'Spring'
    },
    {
      name: 'Summer Collection',
      description: 'Bright colors and coastal vibes for sun-drenched days.',
      image: 'https://picsum.photos/seed/summer-home/800/1000',
      season: 'Summer'
    },
    {
      name: 'Autumn Collection',
      description: 'Warm tones and cozy textures for the golden season.',
      image: 'https://picsum.photos/seed/autumn-home/800/1000',
      season: 'Autumn'
    },
    {
      name: 'Winter Collection',
      description: 'Soft knits and serene whites for peaceful winter nights.',
      image: 'https://picsum.photos/seed/winter-home/800/1000',
      season: 'Winter'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-16 text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Our Collections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed"
        >
          Explore our curated seasonal edits, each thoughtfully crafted to bring the beauty of the outdoors into your living space.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
              <p className="text-white/80 max-w-md mb-6">{collection.description}</p>
              <Link
                to={
                  collection.name === 'Summer Collection' ? '/collections/summer' :
                    collection.name === 'Spring Collection' ? '/collections/spring' :
                      collection.name === 'Autumn Collection' ? '/collections/fall' :
                        `/catalog?season=${collection.season}`
                }
                className="inline-flex items-center text-white font-bold group/link"
              >
                <span className="border-b-2 border-white/30 group-hover/link:border-white transition-colors pb-1">
                  View Collection
                </span>
                <ChevronRight size={20} className="ml-2 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
      >
        <img
          src="https://picsum.photos/seed/hearth-about/1000/1250"
          alt="Artisanal workshop"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-10 order-1 lg:order-2"
      >
        <div className="space-y-4">
          <p className="text-primary font-bold uppercase tracking-widest text-sm">Our Story</p>
          <h2 className="text-5xl font-extrabold leading-tight tracking-tighter">
            Bringing the <span className="text-primary italic">Soul</span> of the Seasons into Your Home.
          </h2>
        </div>

        <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
          <p>
            Founded on the belief that our living spaces should be as dynamic as the world around us, Hearth & Home was born from a passion for artisanal craftsmanship and the changing rhythms of nature.
          </p>
          <p>
            We partner with small-scale makers and ethical workshops across the globe to bring you home goods that aren't just beautiful, but have a story to tell. From hand-blown glass in the autumn to light linens in the spring, our collections are curated to help you celebrate every moment.
          </p>
          <p>
            Our commitment to sustainability means we prioritize natural materials, timeless design, and quality that lasts for generations. Join us in creating a home that breathes with the seasons.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/10">
          <div>
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">Artisan Partners</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">100%</p>
            <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">Ethically Sourced</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const SummerCollectionPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const summerProducts = PRODUCTS.filter(p => p.season === 'Summer');

  // Mock additional products if needed to fill the grid
  const displayProducts = [...summerProducts,
  { id: 101, name: "Linen Beach Towel", price: 42, image: "https://picsum.photos/seed/summer1/600/800", season: 'Summer', collection: 'Summer Collection' },
  { id: 102, name: "Ceramic Fruit Bowl", price: 58, image: "https://picsum.photos/seed/summer2/600/800", season: 'Summer', collection: 'Summer Collection' },
  { id: 103, name: "Rattan Sun Hat", price: 35, image: "https://picsum.photos/seed/summer3/600/800", season: 'Summer', collection: 'Summer Collection' },
  { id: 104, name: "Outdoor Lantern Set", price: 85, image: "https://picsum.photos/seed/summer4/600/800", season: 'Summer', collection: 'Summer Collection' },
  { id: 105, name: "Citrus Scented Diffuser", price: 28, image: "https://picsum.photos/seed/summer5/600/800", season: 'Summer', collection: 'Summer Collection' },
  { id: 106, name: "Teak Garden Stool", price: 145, image: "https://picsum.photos/seed/summer6/600/800", season: 'Summer', collection: 'Summer Collection' },
  ] as Product[];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16 space-y-6 max-w-3xl">
        <Link to="/collections" className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-widest group">
          <ChevronLeft size={18} className="mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>
        <h2 className="text-5xl font-extrabold tracking-tight">Summer Collection</h2>
        <p className="text-xl text-slate-500 leading-relaxed">
          Bright colors, lightweight textures, and coastal-inspired accents. Our Summer Collection is designed to bring the warmth and energy of the sun-drenched days into your living space.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {displayProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} onQuickView={setSelectedProduct} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const FallCollectionPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fallProducts = PRODUCTS.filter(p => p.season === 'Autumn');

  const displayProducts = [...fallProducts,
  { id: 201, name: "Woolen Throw Blanket", price: 85, image: "https://picsum.photos/seed/fall1/600/800", season: 'Autumn', collection: 'Fall Collection' },
  { id: 202, name: "Rustic Pine Candle", price: 24, image: "https://picsum.photos/seed/fall2/600/800", season: 'Autumn', collection: 'Fall Collection' },
  { id: 203, name: "Copper Kitchen Set", price: 120, image: "https://picsum.photos/seed/fall3/600/800", season: 'Autumn', collection: 'Fall Collection' },
  { id: 204, name: "Harvest Wreath", price: 45, image: "https://picsum.photos/seed/fall4/600/800", season: 'Autumn', collection: 'Fall Collection' },
  { id: 205, name: "Leather Journal", price: 32, image: "https://picsum.photos/seed/fall5/600/800", season: 'Autumn', collection: 'Fall Collection' },
  { id: 206, name: "Velvet Accent Pillow", price: 38, image: "https://picsum.photos/seed/fall6/600/800", season: 'Autumn', collection: 'Fall Collection' },
  ] as Product[];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16 space-y-6 max-w-3xl">
        <Link to="/collections" className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-widest group">
          <ChevronLeft size={18} className="mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>
        <h2 className="text-5xl font-extrabold tracking-tight">Fall Collection</h2>
        <p className="text-xl text-slate-500 leading-relaxed">
          Warm tones, cozy textures, and earthy accents. Our Fall Collection captures the essence of the harvest season, bringing comfort and richness to your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {displayProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} onQuickView={setSelectedProduct} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SpringCollectionPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const springProducts = PRODUCTS.filter(p => p.season === 'Spring');

  const displayProducts = [...springProducts,
  { id: 301, name: "Floral Linen Napkins", price: 28, image: "https://picsum.photos/seed/spring1/600/800", season: 'Spring', collection: 'Spring Collection' },
  { id: 302, name: "Glass Bud Vase", price: 18, image: "https://picsum.photos/seed/spring2/600/800", season: 'Spring', collection: 'Spring Collection' },
  { id: 303, name: "Woven Picnic Basket", price: 65, image: "https://picsum.photos/seed/spring3/600/800", season: 'Spring', collection: 'Spring Collection' },
  { id: 304, name: "Pastel Ceramic Mug", price: 22, image: "https://picsum.photos/seed/spring4/600/800", season: 'Spring', collection: 'Spring Collection' },
  { id: 305, name: "Embroidered Table Runner", price: 48, image: "https://picsum.photos/seed/spring5/600/800", season: 'Spring', collection: 'Spring Collection' },
  { id: 306, name: "Lavender Scented Candle", price: 24, image: "https://picsum.photos/seed/spring6/600/800", season: 'Spring', collection: 'Spring Collection' },
  ] as Product[];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16 space-y-6 max-w-3xl">
        <Link to="/collections" className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-widest group">
          <ChevronLeft size={18} className="mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Collections
        </Link>
        <h2 className="text-5xl font-extrabold tracking-tight">Spring Collection</h2>
        <p className="text-xl text-slate-500 leading-relaxed">
          Fresh beginnings, delicate florals, and airy textures. Our Spring Collection is a celebration of renewal, designed to breathe new life into every corner of your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {displayProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} onQuickView={setSelectedProduct} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sign In Header */}
      <header className="px-6 py-8 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
            <Home size={20} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">
            Hearth <span className="text-primary">&amp;</span> Home
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden sm:inline">Already have an account?</span>
          <button className="px-6 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 transition-all">
            Log in
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl hidden lg:block"
          >
            <img
              src="https://picsum.photos/seed/signin-home/1000/1250"
              alt="Interior design"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white space-y-4">
              <h2 className="text-4xl font-bold leading-tight">Elevate your living.</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-md">
                Discover curated home decor that reflects your unique style and creates a sanctuary of comfort.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-extrabold tracking-tight">Create your account</h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Join our community of home decor enthusiasts and start transforming your space today.
              </p>
            </div>

            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-12 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-12 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-12 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-1">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="terms" className="text-sm text-slate-500">
                  I agree to the <span className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                </label>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 transform active:scale-[0.98]">
                Sign up
              </button>
            </form>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or sign up with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <Github size={20} />
                Github
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Sign In Footer */}
      <footer className="px-6 py-16 md:px-12 border-t border-slate-50 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                <Home size={18} />
              </div>
              <h2 className="text-lg font-extrabold tracking-tight uppercase">Hearth &amp; Home</h2>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Curating comfort and style for every home since 2012.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {['Furniture', 'Lighting', 'Textiles', 'Decor'].map(item => (
                <li key={item} className="hover:text-primary cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {['About Us', 'Sustainability', 'Careers', 'Press'].map(item => (
                <li key={item} className="hover:text-primary cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              {['Help Center', 'Shipping', 'Returns', 'Contact'].map(item => (
                <li key={item} className="hover:text-primary cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">
            © 2024 Hearth &amp; Home. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-400">
            <Share2 size={18} className="hover:text-primary cursor-pointer transition-colors" />
            <Mail size={18} className="hover:text-primary cursor-pointer transition-colors" />
            <Home size={18} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin';

  return (
    <div className="min-h-screen font-sans">
      {!isAuthPage && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/summer" element={<SummerCollectionPage />} />
          <Route path="/collections/fall" element={<FallCollectionPage />} />
          <Route path="/collections/spring" element={<SpringCollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
