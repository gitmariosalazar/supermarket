import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceProductRepository } from '../../../domain/contracts/product.repository.interface';
import { ProductResponse } from '../../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../domain/schemas/model/product.model';
import { ProductAdapter } from '../../adapters/product.adapter';

export class ProductRepositoryMockupImplementation
  implements InterfaceProductRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  findAllProducts(): ProductResponse[] {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values()).map(
      ProductAdapter.productModelToProductResponse
    );
  }

  findProductsByCategoryName(categoryName: string): ProductResponse[] {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values())
      .filter(
        (productModel) => productModel.getCategory().getName() === categoryName
      )
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  findProductWarningStock(): ProductResponse[] {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values())
      .filter((productModel) => productModel.getStock() < 5)
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): ProductResponse[] {
    const products = this.databaseMockup.getInventory();

    return Array.from(products.getTable().values())
      .filter(
        (productModel) =>
          productModel.getStock() >= startStock &&
          productModel.getStock() <= endStock
      )
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  findProductByCode(code: string): ProductResponse | null {
    const products = this.databaseMockup.getInventory();
    const productFound: ProductModel | undefined = products.find(code);
    return productFound !== undefined
      ? ProductAdapter.productModelToProductResponse(productFound)
      : null;
  }

  createProduct(productModel: ProductModel): ProductResponse | null {
    const productCreated: ProductModel | undefined = this.databaseMockup
      .getInventory()
      .add(productModel.getCode(), productModel);
    return productCreated !== undefined
      ? ProductAdapter.productModelToProductResponse(productCreated)
      : null;
  }

  updateProduct(
    code: string,
    productModel: ProductModel
  ): ProductResponse | null {
    const productUpdated: ProductModel | undefined = this.databaseMockup
      .getInventory()
      .update(code, productModel);
    return productUpdated !== undefined
      ? ProductAdapter.productModelToProductResponse(productUpdated)
      : null;
  }
}
