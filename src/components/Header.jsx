import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { BiStore } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdContactSupport, MdRateReview } from "react-icons/md";
import { getCart } from "../utils/cart";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const[isOpen, setIsOpen] = useState(false);
  const[cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();
  }, [location.pathname])

  async function loadCartCount() {
    try {
      const cart = await getCart();
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error loading cart count:", error);
    }
  }

  return (
    <header className="w-full h-[100px] bg-accent flex justify-center items-center text-white text-2xl mb-[20px] relative">
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed z-[100] top-0 left-0 w-[100vh] h-[100vh] bg-[#00000050]">
          <div className="h-full w-[300px] bg-white flex flex-col">
            {/* Mobile Menu Header */}
            <div className="w-full bg-accent h-[100px] flex items-center">
              <img src="/logo.png" className="w-[240px] h-[100px] object-cover ml-2" />
              <IoClose 
                className="text-white text-4xl hover:text-gray-300 cursor-pointer transition-colors" 
                onClick={() => setIsOpen(false)}
              />
              {/* <h2 className="text-white text-xl font-semibold">Menu</h2> */}
            </div>

            {/* Mobile Menu Items */}
            <div className="w-full h-full flex flex-col p-[45px] items-start gap-[30px]">
              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/");
                }}
              >
                <HiHome className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                Home
              </button>

              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/products");
                }}
              >
                <BiStore className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                Products
              </button>

              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/reviews");
                }}
              >
                <MdRateReview className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                Reviews
              </button>

              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/aboutUS");
                }}
              >
                <FaInfoCircle className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                About Us
              </button>

              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/contactUS");
                }}
              >
                <MdContactSupport className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                Contact Us
              </button>

              <button
                className="text-accent text-2xl flex flex-row items-center hover:text-accent-hover transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/cart");
                }}
              >
                <TiShoppingCart className="text-accent text-2xl mr-3 hover:text-accent-hover transition-colors" />
                Cart

                {cartCount > 0 && (
                  <span className="absolute top-[-8px] left-[18px] bg-red-500 text-white text-xs rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    {cartCount}
                  </span>
                  )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hamburger Menu Button*/}
      <GiHamburgerMenu 
        className="text-white text-4xl absolute left-[20px] md:hidden cursor-pointer hover:text-secondary transition-colors" 
        onClick={() => setIsOpen(true)}
      />

      {/* Desktop Navigation */}
      <Link to="/">
        <img src="/logo.png" className="w-[240px] hidden md:flex absolute left-0 top-0 h-[100px] object-cover ml-2" />
      </Link>
      <div className="hidden ml-10 md:flex justify-center items-center">
        <Link to="/" className="text-white text-xl hover:text-secondary transition-colors flex flex-row items-center">
          <HiHome className="mr-2" />
          Home
        </Link>
        <Link to="/products" className="ml-6 text-white text-xl hover:text-secondary transition-colors flex flex-row items-center">
          <BiStore className="mr-2" />
          Products
        </Link>
        <Link to="/reviews" className="ml-6 text-white text-xl hover:text-secondary transition-colors flex flex-row items-center justify-center">
          <MdRateReview className="mr-2" />
          Reviews
        </Link>
        <Link to="/aboutUS" className="ml-6 text-white text-xl hover:text-secondary transition-colors flex flex-row items-center">
          <FaInfoCircle className="mr-2" />
          About Us
        </Link>
        <Link to="/contactUS" className="ml-6 text-white text-xl hover:text-secondary transition-colors flex flex-row items-center">
          <MdContactSupport className="mr-1" />
          Contact Us
        </Link>
      </div>
      <div className="absolute flex right-[20px] gap-10">
        <div className="text-xl font-serif flex gap-3">
          <Link to="/login" className="hover:text-black">
            Login
          </Link>
          <Link to="/register" className="hover:text-black">
            Sign up
          </Link>
        </div>
        <Link 
          to="/cart" 
          className="hidden md:right-[50px] md:flex hover:text-secondary transition-colors  flex-row items-center"
        >
          <TiShoppingCart className="text-3xl" />
          {cartCount > 0 && (
            <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-[22px] h-[22px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
        
    </header>
  );
}