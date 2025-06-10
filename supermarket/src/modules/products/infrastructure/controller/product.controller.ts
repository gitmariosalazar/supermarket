import { ProductService } from '../../application/services/product.use-case.service';
import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  findAllProducts(): ProductResponse[] {
    return this.productService.findAllProducts();
  }

  findProductByCategoryName(categoryName: string): ProductResponse[] {
    return this.productService.findProductsByCategoryName(categoryName);
  }

  findProductByCode(code: string): ProductResponse | null {
    return this.productService.findProductByCode(code);
  }

  createProduct(productRequest: ProductRequest): ProductResponse | null {
    return this.productService.createProduct(productRequest);
  }

  updateProduct(
    code: string,
    productRequest: ProductRequest
  ): ProductResponse | null {
    return this.productService.updateProduct(code, productRequest);
  }

  findProductWarningStock(): ProductResponse[] {
    return this.productService.findProductWarningStock();
  }

  findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): ProductResponse[] {
    return this.productService.findProductsBetweenStock(startStock, endStock);
  }
}
