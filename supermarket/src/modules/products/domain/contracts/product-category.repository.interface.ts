import { ProductCategoryResponse } from '../schemas/dto/response/product-category.response';
import { ProductCategoryModel } from '../schemas/model/category-product.model';

export interface InterfaceProductCategoryRepository {
  findAllProductCategories(): Promise<ProductCategoryResponse[]>;
  findProductCategoryByName(
    name: string
  ): Promise<ProductCategoryResponse | null>;
  createProductCategory(
    productCategoryModel: ProductCategoryModel
  ): Promise<ProductCategoryResponse | null>;
  updateProductCategory(
    name: string,
    productCategoryModel: ProductCategoryModel
  ): Promise<ProductCategoryResponse | null>;
}
