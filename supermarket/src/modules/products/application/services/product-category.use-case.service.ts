import { InterfaceProductCategoryRepository } from '../../domain/contracts/category/product-category.repository.interface';
import { ProductCategoryRequest } from '../../domain/schemas/dto/request/product-category.request';
import { ProductCategoryResponse } from '../../domain/schemas/dto/response/product-category.response';
import { ProductCategoryModel } from '../../domain/schemas/model/category-product.model';
import { ProductCategoryMapper } from '../mappers/product-category.mapper';
import { InterfaceUseCaseProductCategory } from '../usecases/product-category.use-case.interface';

export class ProductCategoryService implements InterfaceUseCaseProductCategory {
  private readonly productCategoryRepository: InterfaceProductCategoryRepository;
  constructor(productCategoryRepository: InterfaceProductCategoryRepository) {
    this.productCategoryRepository = productCategoryRepository;
  }

  findAllProductCategories(): ProductCategoryResponse[] {
    return this.productCategoryRepository.findAllProductCategories();
  }

  findProductCategoryByName(name: string): ProductCategoryResponse | null {
    return this.productCategoryRepository.findProductCategoryByName(name);
  }

  createProductCategory(
    productCategoryRequest: ProductCategoryRequest
  ): ProductCategoryResponse | null {
    const productCategoryModel: ProductCategoryModel =
      ProductCategoryMapper.productCategoryRequestToProductCategoryModel(
        productCategoryRequest
      );
    return this.productCategoryRepository.createProductCategory(
      productCategoryModel
    );
  }

  updateProductCategory(
    name: string,
    productCategoryRequest: ProductCategoryRequest
  ): ProductCategoryResponse | null {
    const productCategoryModel: ProductCategoryModel =
      ProductCategoryMapper.productCategoryRequestToProductCategoryModel(
        productCategoryRequest
      );
    return this.productCategoryRepository.updateProductCategory(
      name,
      productCategoryModel
    );
  }
}
