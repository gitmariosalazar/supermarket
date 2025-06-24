import { increasedPercentage } from '../../../../settings/environments/environments';
import { InterfaceProductRepository } from '../../domain/contracts/product.repository.interface';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../domain/schemas/model/product.model';
import { ProductMapper } from '../mappers/product.mapper';
import { InterfaceUseCaseProduct } from '../usecases/product.use-case.interface';

export class ProductService implements InterfaceUseCaseProduct {
  private readonly productRepository: InterfaceProductRepository;
  constructor(productRepository: InterfaceProductRepository) {
    this.productRepository = productRepository;
  }

  async findUnpurchasedProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findUnpurchasedProducts();
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findPurchasedProducts();
  }

  async findProductsByCategoryName(
    categoryName: string
  ): Promise<ProductResponse[]> {
    return await this.productRepository.findProductsByCategoryName(
      categoryName
    );
  }
  async findAllProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findAllProducts();
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    return await this.productRepository.findProductByCode(code);
  }

  async createProduct(
    productRequest: ProductRequest
  ): Promise<ProductResponse | null> {
    const productModel: ProductModel =
      ProductMapper.productRequestToProductModel(productRequest);
    productModel.setPublicPrice(
      (productModel.getSupplierPrice() * (100 + increasedPercentage)) / 100
    );
    return await this.productRepository.createProduct(productModel);
  }

  async updateProduct(
    code: string,
    productRequest: ProductRequest
  ): Promise<ProductResponse | null> {
    const productModel: ProductModel =
      ProductMapper.productRequestToProductModel(productRequest);
    productModel.setPublicPrice(
      (productModel.getSupplierPrice() * (100 + increasedPercentage)) / 100
    );
    return await this.productRepository.updateProduct(code, productModel);
  }

  async findProductWarningStock(): Promise<ProductResponse[]> {
    return await this.productRepository.findProductWarningStock();
  }

  async findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): Promise<ProductResponse[]> {
    return await this.productRepository.findProductsBetweenStock(
      startStock,
      endStock
    );
  }
}
