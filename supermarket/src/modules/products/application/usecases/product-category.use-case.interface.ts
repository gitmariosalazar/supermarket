import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';

export interface InterfaceUseCaseProductCategory {
  findAllProductCategories(): Promise<ProductCategoryResponse[]>;
  findProductCategoryByName(
    name: string
  ): Promise<ProductCategoryResponse | null>;
  createProductCategory(
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null>;
  updateProductCategory(
    name: string,
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null>;
}
