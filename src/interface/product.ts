export interface Product {
  id: string;
  title: string;
  price: number | null;
  currency: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  seller?: string;
  brand?: string;
  url?: string;
}

export interface ProductSearchFilters {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  sortBy?: "relevance" | "price-low" | "price-high" | "rating";
}

export interface Product {
  name: string;
  description?: string;
  category?: string;
  url?: string;
  thumbnail?: string;
  original_image?: string;
  source?: string;
}
