import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const collections = [
    {
      name: "Skincare",
      emoji: "🧴",
      description: "Nourish and rejuvenate your skin with our natural and effective skincare essentials."
    },
    {
      name: "Makeup",
      emoji: "💄",
      description: "Express your beauty with vibrant shades and long-lasting makeup products."
    },
    {
      name: "Fragrance",
      emoji: "🌸",
      description: "Delight your senses with enchanting perfumes and refreshing body mists."
    },
    {
      name: "Haircare",
      emoji: "💇‍♀️",
      description: "Strengthen and style your hair with our luxurious shampoos, oils, and treatments."
    }
  ]

  const topBrands = [
    {
      name: "Spa Ceylon",
      icon: "🌿",
      description: "Luxury Ayurvedic wellness products inspired by Sri Lanka's ancient healing traditions."
    },
    {
      name: "Nature's Secrets",
      icon: "🍃",
      description: "Herbal beauty solutions crafted with natural ingredients and modern science."
    },
    {
      name: "Janet Ayurveda",
      icon: "🪶",
      description: "Trusted Ayurvedic skincare and haircare made with time-tested herbal formulas."
    },
    {
      name: "Prevense",
      icon: "🌱",
      description: "Iconic Sri Lankan brand offering authentic Ayurvedic care for skin, hair, and body."
    }
  ];


  return (
    <div className="min-h-screen bg-primary pb-20 ">
      {/* HERO SECTION */}
      <div className="flex justify-center mb-8 px-4 sm:px-6 lg:px-8">
        <section className="h-auto min-h-[500px] sm:min-h-[600px] lg:h-[670px] w-full flex flex-col items-start relative">

          <video src="\Video\background.mp4" 
            className="w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg absolute top-0 left-0" 
            autoPlay
            loop
            muted
            playsInline 
          />

          <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          
            <div className="lg:ml-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 font-serif text-white/90">
                Glow in <br /> Your Own Way
              </h1>
              <p className="text-white/80 max-w-md mb-6 sm:mb-8 text-base sm:text-lg">
                Discover our curated collection of premium cosmetics and skincare
                products designed to enhance your natural beauty.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/products" className="px-6 py-3 rounded-md bg-accent hover:bg-accent-hover text-white transition text-center">
                  Shop Now
                </Link>
                <Link to="/aboutUs" className="px-6 py-3 rounded-md border border-white/50 hover:bg-white/10 text-white/80 transition text-center">
                  Learn More
                </Link>
              </div>
            </div>

          
            <div className="hidden lg:flex justify-center items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-[700px] h-[400px] xl:h-[500px]">
                <img
                  src="\frontimag.png"
                  alt="Beauty products"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* COLLECTION */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 sm:mt-16 lg:mt-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 font-serif">Our Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {collections.map((item) => (
            <div
              key={item.name}
              className="rounded-xl bg-white shadow-sm hover:shadow-md transition p-6 text-center"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-semibold mb-2 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent-hover mt-12 sm:mt-16 lg:mt-20 text-white py-12 sm:py-16 lg:py-20 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif">Glow Starts With You</h2>
        <p className="mb-5 text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
          Beauty essentials trusted by thousands worldwide.
        </p>
        <Link to="/products" className="inline-block px-6 sm:px-8 py-3 rounded-md bg-white text-accent hover:bg-gray-100 transition shadow-lg">
          Explore Products
        </Link>
      </section>

      {/* TOP BRANDS */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 sm:mt-16 lg:mt-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 font-serif">Top Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {topBrands.map((item) => (
            <div
              key={item.name}
              className="rounded-xl bg-white shadow-sm hover:shadow-md transition p-6 text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold font-serif mb-2 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}