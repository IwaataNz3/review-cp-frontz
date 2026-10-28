// Tipos que representam os dados retornados pela API DummyJSON.

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

// Campos usados na listagem. Também é o formato salvo nos favoritos.
export type ProductSummary = Pick<
  Product,
  "id" | "title" | "thumbnail" | "category" | "price" | "rating" | "stock"
>;

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
