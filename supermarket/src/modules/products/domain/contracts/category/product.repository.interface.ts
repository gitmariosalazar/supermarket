import { ProductResponse } from '../../schemas/dto/response/product.response';
import { ProductModel } from '../../schemas/model/product.model';

export interface InterfaceProductRepository {
  findAllProducts(): ProductResponse[];
  findProductByCode(code: string): ProductResponse | null;
  createProduct(productModel: ProductModel): ProductResponse | null;
  updateProduct(
    code: string,
    productModel: ProductModel
  ): ProductResponse | null;
}
