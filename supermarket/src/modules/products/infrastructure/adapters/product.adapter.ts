import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductCategoryModel } from '../../domain/schemas/model/category-product.model';
import { ProductModel } from '../../domain/schemas/model/product.model';
import { ProductCategoryAdapter } from './product-category.adapter';

export class ProductAdapter {
  static productModelToProductResponse(
    productModel: ProductModel
  ): ProductResponse {
    const productResponse: ProductResponse = {
      code: productModel.getCode(),
      name: productModel.getName(),
      description: productModel.getDescription(),
      iva: productModel.getIva(),
      category:
        ProductCategoryAdapter.productCategoryModelToProductCategoryResponse(
          productModel.getCategory()
        ),
      stock: productModel.getStock(),
      publicPrice: productModel.getPublicPrice(),
      supplierPrice: productModel.getSupplierPrice()
    };
    return productResponse;
  }

  static productResponseToProductRequest(
    productResponse: ProductResponse
  ): ProductRequest {
    const productRequest: ProductRequest = new ProductRequest(
      productResponse.code,
      productResponse.name,
      productResponse.description,
      productResponse.iva,
      ProductCategoryAdapter.productCategoryResponseToProductCategoryRequest(
        productResponse.category
      ),
      productResponse.stock,
      productResponse.supplierPrice
    );
    return productRequest;
  }
}
