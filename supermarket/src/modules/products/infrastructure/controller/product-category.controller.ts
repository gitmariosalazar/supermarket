import { ProductCategoryService } from '../../application/services/product-category.use-case.service';
import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';

export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService
  ) {}
  async findAllProductCategories(): Promise<ProductCategoryResponse[]> {
    return await this.productCategoryService.findAllProductCategories();
  }

  async findProductCategoryByName(
    name: string
  ): Promise<ProductCategoryResponse | null> {
    return await this.productCategoryService.findProductCategoryByName(name);
  }

  async createProductCategory(
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null> {
    return await this.productCategoryService.createProductCategory(
      productCategoryRequest
    );
  }

  async updateProductCategory(
    name: string,
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null> {
    return await this.productCategoryService.updateProductCategory(
      name,
      productCategoryRequest
    );
  }
}
