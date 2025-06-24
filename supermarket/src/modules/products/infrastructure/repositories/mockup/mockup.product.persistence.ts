import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceProductRepository } from '../../../domain/contracts/product.repository.interface';
import { ProductResponse } from '../../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../domain/schemas/model/product.model';
import { ProductAdapter } from '../../adapters/product.adapter';

export class ProductRepositoryMockupImplementation
  implements InterfaceProductRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  async findAllProducts(): Promise<ProductResponse[]> {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values()).map(
      ProductAdapter.productModelToProductResponse
    );
  }

  async findProductsByCategoryName(
    categoryName: string
  ): Promise<ProductResponse[]> {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values())
      .filter(
        (productModel) => productModel.getCategory().getName() === categoryName
      )
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    const products = this.databaseMockup.getInventory();
    const invoices = this.databaseMockup.getInvoices();

    const productResponse: ProductResponse[] = [];
    const productsId: Set<string> = new Set<string>();
    invoices.getTable().forEach((invoice) => {
      invoice
        .getCart()
        .getCartItems()
        .getTable()
        .forEach((item) => {
          if (!productsId.has(item.getProduct().getCode())) {
            productResponse.push(
              ProductAdapter.productModelToProductResponse(
                products.find(item.getProduct().getCode())!
              )
            );
          }
          productsId.add(item.getProduct().getCode());
        });
    });
    return productResponse;
  }

  async findUnpurchasedProducts(): Promise<ProductResponse[]> {
    const products = this.databaseMockup.getInventory();
    const invoices = this.databaseMockup.getInvoices();

    const purchasedProductIds = new Set<string>();
    const productResponse: ProductResponse[] = [];

    for (const invoice of invoices.getTable().values()) {
      const productsInInvoice = Array.from(
        invoice.getCart().getCartItems().getTable().values()
      );

      for (const product of productsInInvoice) {
        purchasedProductIds.add(product.getProduct().getCode());
      }
    }

    for (const product of products.getTable().values()) {
      if (!purchasedProductIds.has(product.getCode())) {
        productResponse.push(
          ProductAdapter.productModelToProductResponse(product)
        );
      }
    }

    return productResponse;
  }

  async findProductWarningStock(): Promise<ProductResponse[]> {
    const products = this.databaseMockup.getInventory();
    return Array.from(products.getTable().values())
      .filter((productModel) => productModel.getStock() < 5)
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  async findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): Promise<ProductResponse[]> {
    const products = await this.databaseMockup.getInventory();

    return Array.from(products.getTable().values())
      .filter(
        (productModel) =>
          productModel.getStock() >= startStock &&
          productModel.getStock() <= endStock
      )
      .map((product) => ProductAdapter.productModelToProductResponse(product));
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const products = this.databaseMockup.getInventory();
    const productFound: ProductModel | undefined = products.find(code);
    return productFound !== undefined
      ? ProductAdapter.productModelToProductResponse(productFound)
      : null;
  }

  async createProduct(
    productModel: ProductModel
  ): Promise<ProductResponse | null> {
    const productCreated: ProductModel | undefined = this.databaseMockup
      .getInventory()
      .add(productModel.getCode(), productModel);
    return productCreated !== undefined
      ? ProductAdapter.productModelToProductResponse(productCreated)
      : null;
  }

  async updateProduct(
    code: string,
    productModel: ProductModel
  ): Promise<ProductResponse | null> {
    const productUpdated: ProductModel | undefined = this.databaseMockup
      .getInventory()
      .update(code, productModel);
    return productUpdated !== undefined
      ? ProductAdapter.productModelToProductResponse(productUpdated)
      : null;
  }
}
