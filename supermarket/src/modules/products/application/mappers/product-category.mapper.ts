import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryModel } from '../../domain/schemas/model/category-product.model';

export class ProductCategoryMapper {
  static productCategoryRequestToProductCategoryModel(
    productCategoryRequest: ProductCategoryRequest
  ): ProductCategoryModel {
    const productCategoryModel: ProductCategoryModel = new ProductCategoryModel(
      productCategoryRequest.name,
      productCategoryRequest.description
    );
    return productCategoryModel;
  }
}
