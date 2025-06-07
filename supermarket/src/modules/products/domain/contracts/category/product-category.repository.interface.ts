import { ProductCategoryResponse } from '../../schemas/dto/response/product-category.response';
import { ProductCategoryModel } from '../../schemas/model/category-product.model';

export interface InterfaceProductCategoryRepository {
  findAllProductCategories(): ProductCategoryResponse[];
  findProductCategoryByName(name: string): ProductCategoryResponse | null;
  createProductCategory(
    productCategoryModel: ProductCategoryModel
  ): ProductCategoryResponse | null;
  updateProductCategory(
    name: string,
    productCategoryModel: ProductCategoryModel
  ): ProductCategoryResponse | null;
}
