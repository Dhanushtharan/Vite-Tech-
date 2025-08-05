import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaUndoAlt,
  FaShieldAlt,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#F9F4F8] text-[#4A154B] py-16 px-6 text-sm border-t border-[#A97BA5]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold mb-3 text-[#A97BA5]">ONLINE SHOPPING</h3>
          <ul className="space-y-1 opacity-90">
            <li>
              <Link
                href="/categoryList/men"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/categoryList/women"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/category/smartphones"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Gadgets
              </Link>
            </li>
            <li>
              <Link
                href="/category/home-decoration"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/category/beauty"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Beauty
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-[#A97BA5]">USEFUL LINKS</h3>
          <ul className="space-y-1 opacity-90">
            <li>
              <Link
                href="/blog"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/siteMap"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Site Map
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-[#A97BA5]">CUSTOMER POLICIES</h3>
          <ul className="space-y-1 opacity-90">
            <li>
              <Link
                href="/contact"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/FAQ"
                className="hover:underline hover:text-[#A97BA5] transition"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div>
            <h3 className="font-bold mb-3 text-[#A97BA5]">KEEP IN TOUCH</h3>
            <div className="flex gap-4 text-xl text-[#4A154B]/70 hover:text-[#4A154B] transition">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <FaShieldAlt className="w-6 h-6 text-[#A97BA5] mt-1" />
            <p className="text-sm text-[#4A154B]">
              <strong>100% ORIGINAL</strong> guarantee for all products at Zencart!
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FaUndoAlt className="w-6 h-6 text-[#A97BA5] mt-1" />
            <p className="text-sm text-[#4A154B]">
              <strong>Return within 14 days</strong> of receiving your order.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-[#4A154B]/50">
        &copy; {new Date().getFullYear()} Zencart. All rights reserved.
      </div>
    </footer>
  );
}
