import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';

export interface InterfaceUseCaseProductCategory {
  findAllProductCategories(): ProductCategoryResponse[];
  findProductCategoryByName(name: string): ProductCategoryResponse | null;
  createProductCategory(
    productCategoryModel: ProductCategoryRequest
  ): ProductCategoryResponse | null;
  updateProductCategory(
    name: string,
    productCategoryModel: ProductCategoryRequest
  ): ProductCategoryResponse | null;
}
