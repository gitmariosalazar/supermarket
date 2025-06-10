import { ProductCategoryResponse } from './product-category.response';

export interface ProductResponse {
  code: string;
  name: string;
  description: string;
  iva: number;
  category: ProductCategoryResponse;
  stock: number;
  publicPrice: number;
  supplierPrice: number;
}
