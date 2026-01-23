import { Drawer, Skeleton } from "@mantine/core";
import React, { useState } from "react";
import { Product } from "@/interface/product";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getDesignProducts } from "@/api/products";

const ProductDrawer = ({
  opened,
  close,
  url,
}: {
  opened: boolean;
  close: () => void;
  url?: string;
}) => {
  // Mock product data - replace with actual data from props or API
  //   const [products] = useState<Product[]>([
  //     {
  //       id: "1",
  //       title:
  //         "Crisa Cross Chair with Wheels Cross-Legged Swivel Desk Chair with Soft...",
  //       price: 79000.0,
  //       currency: "NGN",
  //       image:
  //         "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
  //       rating: 5,
  //       reviewCount: 13,
  //       tags: ["EasytoAssemble", "Multifunctional", "Comfortable"],
  //       brand: "Costway",
  //     },
  //     {
  //       id: "2",
  //       title: "Task Chair Inbox Zero Frame Color: Deep Grey",
  //       price: 111990.0,
  //       currency: "NGN",
  //       image:
  //         "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
  //       rating: 4,
  //       reviewCount: 206,
  //       tags: ["EasytoAssemble", "Comfortable", "Supportive"],
  //       brand: "Wayfair",
  //     },
  //     {
  //       id: "3",
  //       title:
  //         "OWENIE Sheer White Curtains, 84 Inch Length 2 Panels Set, Rod Pocket Voile...",
  //       price: 16180.0,
  //       currency: "NGN",
  //       image:
  //         "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=400&fit=crop",
  //       rating: 4,
  //       reviewCount: 0,
  //       tags: [],
  //       seller: "Amazon - Seller",
  //     },
  //     {
  //       id: "4",
  //       title: 'Koda Slim 15" LED Ceiling Light with Adjustable Color',
  //       price: 69990.0,
  //       currency: "NGN",
  //       image:
  //         "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
  //       rating: 4,
  //       reviewCount: 284,
  //       tags: ["EasytoInstall", "QualityLighting", "Attractive"],
  //       brand: "CORA Lights",
  //     },
  //   ]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) =>
          index < Math.floor(rating) ? (
            <AiFillStar key={index} className="w-3 h-3 text-yellow-400" />
          ) : (
            <AiOutlineStar key={index} className="w-3 h-3 text-gray-300" />
          )
        )}
      </div>
    );
  };

  const formatPrice = (price: number) => {
    if (price) {
      return `₦${price.toLocaleString("en-NG", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    }
    return "₦0";
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", url],
    queryFn: () => getDesignProducts(url!),
    enabled: !!url && !!opened,
  });

  // console.log(data);

  //   category
  // :
  // "furniture"
  // description
  // :
  // "Beige sofa with vertical channeling detail and rounded armrests"
  // name
  // :
  // "Channel Tufted Glam Indoor Living Room Sofa - Bed Bath & Beyond - 40488174"
  // original_image
  // :
  // "https://ak1.ostkcdn.com/images/products/is/images/direct/e1f591021ce0cc2a209497a76a41a5de0e8ebc85/Channel-Tufted-Glam-Indoor-Living-Room-Sofa.jpg?impolicy=medium"
  // price
  // :
  // null
  // source
  // :
  // "Bed Bath"
  // thumbnail
  // :
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBHw-jVdPLG5zIOQXfYgIUGDsEzD4eMEsx0g&s"
  // url
  // :
  // "https://ww
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      title="Product List"
      size="lg"
      overlayProps={{ backgroundOpacity: 0.5 }}
      styles={{
        title: {
          fontSize: "18px",
          fontWeight: 600,
          color: "#333",
          fontFamily: "inherit",
          //   textTransform: "uppercase",
        },
      }}
    >
      <div className="flex flex-col gap-0">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex gap-4 p-4 ${
                  index !== 3 ? "border-b border-gray-200" : ""
                }`}
              >
                {/* Image Skeleton */}
                <Skeleton height={96} width={96} radius="lg" />

                {/* Content Skeleton */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Skeleton height={16} width="80%" mb={8} />
                    <Skeleton height={12} width="40%" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton height={12} width={100} />
                    <Skeleton height={20} width={80} />
                  </div>
                </div>
              </div>
            ))
          : data?.products.map((product: any, index: any) => (
              <div
                key={product.id}
                className={`flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== data?.products?.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
                onClick={() => {
                  if (product.url) {
                    window.open(product.url, "_blank");
                  }
                }}
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-26 h-26 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product?.thumbnail}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  {/* Title and Brand */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 hover:underline ">
                      {product?.name}
                    </h3>
                    {product?.source && (
                      <p className="text-xs text-gray-500 mb-2">
                        {product?.source}
                      </p>
                    )}
                  </div>

                  {/* Rating and Price Row */}
                  <div className="flex items-center justify-between">
                    {/* <div className="flex items-center gap-2">
                      {renderStars(product.rating)}
                      {product.reviewCount > 0 && (
                        <span className="text-xs text-gray-500">
                          ({product.reviewCount})
                        </span>
                      )}
                    </div> */}
                    <div className="w-full flex items-center gap-2">
                      <p className="text-base font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      <FiExternalLink className="w-4 h-4 text-gray-900 cursor-pointer ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
