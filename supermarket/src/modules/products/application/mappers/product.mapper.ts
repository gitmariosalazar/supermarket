import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductModel } from '../../domain/schemas/model/product.model';
import { ProductCategoryMapper } from './product-category.mapper';

export class ProductMapper {
  static productRequestToProductModel(
    productRequest: ProductRequest
  ): ProductModel {
    const productModel: ProductModel = new ProductModel(
      productRequest.code,
      productRequest.name,
      productRequest.description,
      productRequest.iva,
      ProductCategoryMapper.productCategoryRequestToProductCategoryModel(
        productRequest.category
      ),
      productRequest.stock,
      productRequest.publicPrice!,
      productRequest.supplierPrice
    );
    return productModel;
  }
}
