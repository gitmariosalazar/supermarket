import { ProductService } from '../../application/services/product.use-case.service';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  async findAllProducts(): Promise<ProductResponse[]> {
    return await this.productService.findAllProducts();
  }

  async findProductByCategoryName(
    categoryName: string
  ): Promise<ProductResponse[]> {
    return await this.productService.findProductsByCategoryName(categoryName);
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    return await this.productService.findProductByCode(code);
  }

  async createProduct(
    productRequest: ProductRequest
  ): Promise<ProductResponse | null> {
    return await this.productService.createProduct(productRequest);
  }

  async updateProduct(
    code: string,
    productRequest: ProductRequest
  ): Promise<ProductResponse | null> {
    return this.productService.updateProduct(code, productRequest);
  }

  async findProductWarningStock(): Promise<ProductResponse[]> {
    return await this.productService.findProductWarningStock();
  }

  async findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): Promise<ProductResponse[]> {
    return this.productService.findProductsBetweenStock(startStock, endStock);
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    return await this.productService.findPurchasedProducts();
  }

  async findUnpurchasedProducts(): Promise<ProductResponse[]> {
    return await this.productService.findUnpurchasedProducts();
  }
}
