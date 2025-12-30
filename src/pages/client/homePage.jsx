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
      description: "Luxury Ayurvedic wellness products inspired by Sri Lanka’s ancient healing traditions."
    },
    {
      name: "Nature’s Secrets",
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
      <div className="flex justify-center mb-8">
        <section className="h-[670px] w-[calc(100vw-50px)] flex flex-col items-start relative ">

          <video src="\Video\background.mp4" 
            className="w-full h-full object-cover rounded-3xl shadow-lg " 
            autoPlay
            loop
            muted
            playsInline 
          />

          <div className="mt-5 w-full my-0 mx-auto px-6 grid md:grid-cols-2 gap-5 items-center absolute top-[-25px] left-0 h-full">

          
            <div className="ml-15">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif text-white/90">
                Glow in <br /> Your Own Way
              </h1>
              <p className="text-white/80 max-w-md mb-8 text-lg">
                Discover our curated collection of premium cosmetics and skincare
                products designed to enhance your natural beauty.
              </p>
              <div className="flex gap-4">
                <Link to="/products" className="px-6 py-3 rounded-md bg-accent hover:bg-accent-hover text-white transition">
                  Shop Now
                </Link>
                <Link to="/aboutUs" className="px-6 py-3 rounded-md border border-white/50 hover:bg-white/10 text-white/80 transition">
                  Learn More
                </Link>
              </div>
            </div>

          
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg w-[700px] h-[500px]">
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
      <section className="mx-auto px-6 max-w-7xl mt-20">
        <h2 className="text-2xl font-semibold mb-8 font-serif">Our Collections</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

      <section className="bg-accent-hover mt-20 text-white py-20 text-center">
        <h2 className="text-3xl font-bold font-serif">Glow Starts With You</h2>
        <p className="mb-5 text-white/80 text-lg">
          Beauty essentials trusted by thousands worldwide.
        </p>
        <Link to="/products" className="px-8 py-3 rounded-md bg-white text-accent hover:bg-gray-100 transition shadow-lg">
          Explore Products
        </Link>
      </section>

      {/* TOP BRANDS */}
      <section className="mx-auto px-6 max-w-7xl mt-20">
        <h2 className="text-2xl font-semibold mb-8 font-serif">Top Brands</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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