import { ProductCategoryService } from '../../application/services/product-category.use-case.service';
import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';

export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService
  ) {}
  findAllProductCategories(): ProductCategoryResponse[] {
    return this.productCategoryService.findAllProductCategories();
  }

  findProductCategoryByName(name: string): ProductCategoryResponse | null {
    return this.productCategoryService.findProductCategoryByName(name);
  }

  createProductCategory(
    productCategoryRequest: ProductCategoryRequest
  ): ProductCategoryResponse | null {
    return this.productCategoryService.createProductCategory(
      productCategoryRequest
    );
  }

  updateProductCategory(
    name: string,
    productCategoryRequest: ProductCategoryRequest
  ): ProductCategoryResponse | null {
    return this.productCategoryService.updateProductCategory(
      name,
      productCategoryRequest
    );
  }
}
