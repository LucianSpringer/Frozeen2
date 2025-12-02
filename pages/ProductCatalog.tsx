
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../types';
import { ShoppingCart, Tag, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCatalog: React.FC = () => {
  const { products, user, addToCart } = useStore();
  
  // States for Filtering & Sorting
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  // Default range 0 to 1 million
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  const getPrice = (product: any) => {
    if (user?.role === 'reseller') {
      return product.resellerPrice;
    }
    return product.price;
  };

  const filteredProducts = products
    .filter(p => {
      const displayPrice = getPrice(p);
      const matchesCategory = selectedCategory === "Semua" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStock = onlyAvailable ? p.stock > 0 : true;
      const matchesPrice = displayPrice >= priceRange.min && displayPrice <= priceRange.max;
      
      return matchesCategory && matchesSearch && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'default') return 0;
      const priceA = getPrice(a);
      const priceB = getPrice(b);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Katalog Produk</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Temukan berbagai pilihan frozen food berkualitas.</p>
        </div>

        {/* Search & Main Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari produk (nama atau deskripsi...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg border font-medium flex items-center gap-2 transition ${showFilters ? 'bg-sky-50 dark:bg-slate-700 border-sky-500 text-sky-600 dark:text-sky-400' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
            >
              <SlidersHorizontal size={18} /> Filter
            </button>
            <div className="relative">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="default">Urutkan: Relevansi</option>
                <option value="asc">Harga: Termurah</option>
                <option value="desc">Harga: Termahal</option>
              </select>
              <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">
                <ArrowUpDown size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8 animate-fade-in-down transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">Kategori</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        selectedCategory === cat 
                        ? 'bg-sky-600 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">Rentang Harga (Rp)</h4>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                     <span className="absolute left-3 top-2 text-xs text-slate-400">Min</span>
                     <input 
                      type="number" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full border dark:border-slate-600 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                  <span className="text-slate-400 font-bold">-</span>
                   <div className="relative flex-1">
                     <span className="absolute left-3 top-2 text-xs text-slate-400">Max</span>
                     <input 
                      type="number" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full border dark:border-slate-600 rounded px-3 pt-5 pb-1 text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">Ketersediaan</h4>
                <div 
                   onClick={() => setOnlyAvailable(!onlyAvailable)}
                   className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-3 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition border border-slate-200 dark:border-slate-600"
                >
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Stok Tersedia Saja</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${onlyAvailable ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-500'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 absolute top-1 ${onlyAvailable ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const displayPrice = getPrice(product);
            const isReseller = user?.role === 'reseller';
            const isOutOfStock = product.stock <= 0;

            return (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-full border border-slate-100 dark:border-slate-700 group">
                <Link to={`/product/${product.id}`} className="block relative h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
                  <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition duration-500 group-hover:scale-110 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`} />
                  {isReseller && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm z-10">
                      <Tag size={12} /> Harga Reseller
                    </div>
                  )}
                  {isOutOfStock && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                        <span className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm transform -rotate-12 border-2 border-white">STOK HABIS</span>
                     </div>
                  )}
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium bg-sky-50 dark:bg-slate-700 px-2 py-1 rounded-md">{product.category}</span>
                    <span className="text-xs text-slate-400">{product.weight}gr</span>
                  </div>
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white mt-2 mb-1 leading-snug hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{product.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        Rp {displayPrice.toLocaleString('id-ID')}
                      </span>
                      {isReseller && (
                        <span className="text-sm text-slate-400 line-through">
                           Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if(!isOutOfStock) addToCart(product);
                      }}
                      disabled={isOutOfStock}
                      className={`w-full font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 active:scale-95 ${isOutOfStock ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
                    >
                      <ShoppingCart size={18} /> {isOutOfStock ? 'Habis' : 'Tambah'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
               <Filter className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Tidak ada produk ditemukan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Coba ganti kata kunci pencarian atau atur ulang filter.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Semua");
                setOnlyAvailable(false);
                setPriceRange({ min: 0, max: 1000000 });
              }}
              className="mt-4 text-sky-600 dark:text-sky-400 font-bold hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
