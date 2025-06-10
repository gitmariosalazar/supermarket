import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';
import { ProductCategoryModel } from '../../domain/schemas/model/category-product.model';

export class ProductCategoryAdapter {
  static productCategoryModelToProductCategoryResponse(
    productCategoryModel: ProductCategoryModel
  ): ProductCategoryResponse {
    const productCategoryResponse: ProductCategoryResponse = {
      name: productCategoryModel.getName(),
      description: productCategoryModel.getDescription()
    };
    return productCategoryResponse;
  }

  static productCategoryResponseToProductCategoryRequest(
    productCategoryResponse: ProductCategoryResponse
  ): ProductCategoryRequest {
    const productCategoryRequest: ProductCategoryRequest =
      new ProductCategoryRequest(
        productCategoryResponse.name,
        productCategoryResponse.description
      );
    return productCategoryRequest;
  }
}
