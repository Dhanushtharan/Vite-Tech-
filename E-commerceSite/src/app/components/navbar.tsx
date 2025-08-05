'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Cinzel } from 'next/font/google';
import { RootState } from '../redux/store';

const cinzel = Cinzel({
  weight: '700',
  subsets: ['latin'],
});

const categories = [
  'smartphones',
  'laptops',
  'fragrances',
  'sports-accessories',
  'groceries',
  'home-decoration',
];

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/me')
      .then((res) => res.json())
      .then(({ loggedIn, user }) => {
        setIsLoggedIn(loggedIn);
        setUserData(loggedIn ? user : null);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserData(null);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=190')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setFilteredProducts([]);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered.slice(0, 8));
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;
    await fetch('/api/logout', { method: 'POST' });
    setIsLoggedIn(false);
    setUserData(null);
    dispatch(clearCart());
    router.refresh();
  };

  const goToProduct = (id: number) => {
    setSearchTerm('');
    setFilteredProducts([]);
    setSearchFocused(false);
    router.push(`/product/${id}`);
  };

  if (!isMounted) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl bg-[#F9F4F8]/70 backdrop-blur-md border border-[#A97BA5] text-[#4A154B] rounded-full px-6 py-3 shadow-md">
      <div className="flex justify-between items-center gap-6 relative">
        <Link href="/" className="group relative flex items-center">
          <div className={`${cinzel.className} text-2xl md:text-3xl tracking-widest text-[#4A154B] italic transition-all duration-300`}>
            ZC
          </div>
          <span className="overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-xs group-hover:ml-2 text-[#4A154B] text-lg md:text-xl font-semibold whitespace-nowrap">
            ZenCart
          </span>
        </Link>

        <div className="relative flex-grow max-w-md" ref={searchDropdownRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            className="w-full rounded-full border border-[#A97BA5] px-4 py-1 text-sm text-[#4A154B] focus:outline-none focus:ring-2 focus:ring-[#A97BA5] bg-white"
          />
          {searchFocused && searchTerm.trim().length >= 2 && (
            <ul className="absolute top-full mt-1 w-full max-h-80 overflow-y-auto rounded-lg border border-[#A97BA5] bg-white shadow-lg z-50">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-[#E7D7F1] px-3 py-2 hover:bg-[#E7D7F1] transition"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goToProduct(product.id)}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-medium text-[#4A154B]">
                      {product.title}
                    </span>
                    <span className="text-xs text-[#A97BA5]">${product.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {searchFocused && !loading && searchTerm.trim().length >= 2 && filteredProducts.length === 0 && (
            <div className="absolute top-full mt-1 w-full rounded-lg border border-[#A97BA5] bg-white p-2 text-sm text-center text-[#A97BA5] shadow-lg z-50">
              No products found
            </div>
          )}
          {searchFocused && loading && (
            <div className="absolute top-full mt-1 w-full rounded-lg border border-[#A97BA5] bg-white p-2 text-sm text-center text-[#A97BA5] shadow-lg z-50">
              Loading...
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A154B]">
          <Link href="/" className="hover:text-[#7E5B8A] transition">Home</Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#7E5B8A] transition">
              Categories <span className="text-xs">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-2 w-40 bg-white border border-[#A97BA5] rounded-lg shadow text-left z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${encodeURIComponent(cat)}`}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-[#E7D7F1] capitalize text-[#4A154B] transition"
                  >
                    {cat.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/sale" className="hover:text-[#7E5B8A] transition">Flash Sale</Link>
        </div>

        {/* Right Section Buttons */}
        <div className="flex items-center gap-3 text-sm" ref={profileDropdownRef}>
          <Link href="/cart">
            <button className="relative px-4 py-2 rounded-full bg-gradient-to-tr from-[#bcfd4c] to-[#7fffd4] text-[#1b1b2f] font-semibold shadow hover:scale-105 transition">
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-[1px]">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {!isLoggedIn ? (
            <Link href="/login">
              <button className="px-4 py-2 rounded-full bg-gradient-to-tr from-[#6e6e6e] to-[#4a154b] text-white font-semibold shadow hover:scale-105 transition">
                Login
              </button>
            </Link>
          ) : (
            <>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="px-4 py-2 rounded-full bg-gradient-to-tr from-[#a97ba5] to-[#4a154b] text-white font-semibold shadow hover:scale-105 transition"
              >
                Profile
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#A97BA5] rounded-lg shadow-lg text-sm p-4 z-50">
                  <p><strong>Username:</strong> {userData.username}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full text-center bg-[#4a154b] text-white px-4 py-2 rounded hover:bg-[#321033] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
