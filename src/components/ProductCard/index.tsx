import React from "react";
import { Product } from "@/interface/product";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number, currency: string) => {
    return `${currency} $${price.toFixed(2)}`;
  };

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

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-lg font-semibold text-gray-900 mb-2">
          {formatPrice(product.price!, product.currency)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500">{product.reviewCount}</span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Seller/Brand */}
        {(product.seller || product.brand) && (
          <p className="text-xs text-gray-500 mt-auto">
            {product.brand || product.seller}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
