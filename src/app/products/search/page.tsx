"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interface/product";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ProductSearchPage = () => {
  // Mock data based on the screenshot
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "",
      title:
        "Crisa Cross Chair with Wheels Cross-Legged Swivel Desk Chair with Soft...",
      price: 79.0,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
      rating: 5,
      reviewCount: 13,
      tags: ["EasytoAssemble", "Multifunctional", "Comfortable"],
      brand: "Costway",
    },
    {
      id: "2",
      name: "",
      title: "Task Chair Inbox Zero Frame Color: Deep Grey",
      price: 111.99,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
      rating: 4,
      reviewCount: 206,
      tags: ["EasytoAssemble", "Comfortable", "Supportive"],
      brand: "Wayfair",
    },
    {
      id: "3",
      name: "",
      title:
        "OWENIE Sheer White Curtains, 84 Inch Length 2 Panels Set, Rod Pocket Voile...",
      price: 16.18,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=400&fit=crop",
      rating: 4,
      reviewCount: 0,
      tags: [],
      seller: "Amazon - Seller",
    },
    {
      id: "4",
      name: "",
      title: 'Koda Slim 15" LED Ceiling Light with Adjustable Color',
      price: 69.99,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
      rating: 4,
      reviewCount: 284,
      tags: ["EasytoInstall", "QualityLighting", "Attractive"],
      brand: "CORA Lights",
    },
    {
      id: "5",
      name: "",
      title: "Twopages Velin Bendable Single Ceiling Curtain Track White",
      price: 0,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop",
      rating: 0,
      reviewCount: 0,
      tags: [],
      brand: "",
    },
    {
      id: "6",
      name: "",
      title: "Costway 43 x 16 Inch Wall Mounted Frameless Full Length Mirror",
      price: 0,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop",
      rating: 0,
      reviewCount: 0,
      tags: [],
      brand: "",
    },
    {
      id: "7",
      name: "",
      title:
        "NBF Signature Series L-Desk Office Suite - American Espresso/Black...",
      price: 0,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop",
      rating: 0,
      reviewCount: 0,
      tags: [],
      brand: "",
    },
    {
      id: "8",
      name: "",
      title:
        "Office Desk | Workstation Desk | Branch Fog / Charcoal / 60 inches x...",
      price: 0,
      currency: "US",
      image:
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=400&fit=crop",
      rating: 0,
      reviewCount: 0,
      tags: [],
      brand: "",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<string>(
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop"
  );

  const thumbnails = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=150&h=150&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Image Gallery */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-4 sticky top-8">
              {/* Main Image */}
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Room preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(
                        thumb.replace("w=150&h=150", "w=600&h=800")
                      )
                    }
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage.includes(
                        thumb.split("?")[0].split("/").pop() || ""
                      )
                        ? "border-gray-900"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Product Grid */}
          <div className="lg:col-span-9">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Buy products like this
              </h1>
              <p className="text-sm text-gray-600">
                Track similar products from over 1,000+ stores to send to your
                email
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => {
                    if (product.url) {
                      window.open(product.url, "_blank");
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `
                  fbq('track', 'SearchProducts');
                  `,
        }}
      />
    </div>
  );
};

export default ProductSearchPage;
