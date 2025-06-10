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

  findProductsByCategoryName(categoryName: string): ProductResponse[] {
    return this.productRepository.findProductsByCategoryName(categoryName)
  }
  findAllProducts(): ProductResponse[] {
    return this.productRepository.findAllProducts();
  }

  findProductByCode(code: string): ProductResponse | null {
    return this.productRepository.findProductByCode(code);
  }

  createProduct(productRequest: ProductRequest): ProductResponse | null {
    const productModel: ProductModel =
      ProductMapper.productRequestToProductModel(productRequest);
    productModel.setPublicPrice(0);
    return this.productRepository.createProduct(productModel);
  }

  updateProduct(
    code: string,
    productRequest: ProductRequest
  ): ProductResponse | null {
    const productModelToUpdate: ProductModel =
      ProductMapper.productRequestToProductModel(productRequest);
    return this.productRepository.updateProduct(code, productModelToUpdate);
  }

  findProductWarningStock(): ProductResponse[] {
    return this.productRepository.findProductWarningStock();
  }

  findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): ProductResponse[] {
    return this.productRepository.findProductsBetweenStock(
      startStock,
      endStock
    );
  }
}
