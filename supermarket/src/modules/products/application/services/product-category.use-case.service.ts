import { InterfaceProductCategoryRepository } from '../../domain/contracts/product-category.repository.interface';
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

  async findAllProductCategories(): Promise<ProductCategoryResponse[]> {
    return await this.productCategoryRepository.findAllProductCategories();
  }

  async findProductCategoryByName(
    name: string
  ): Promise<ProductCategoryResponse | null> {
    return await this.productCategoryRepository.findProductCategoryByName(name);
  }

  async createProductCategory(
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null> {
    const productCategoryModel: ProductCategoryModel =
      ProductCategoryMapper.productCategoryRequestToProductCategoryModel(
        productCategoryRequest
      );
    return await this.productCategoryRepository.createProductCategory(
      productCategoryModel
    );
  }

  async updateProductCategory(
    name: string,
    productCategoryRequest: ProductCategoryRequest
  ): Promise<ProductCategoryResponse | null> {
    const productCategoryModel: ProductCategoryModel =
      ProductCategoryMapper.productCategoryRequestToProductCategoryModel(
        productCategoryRequest
      );
    return await this.productCategoryRepository.updateProductCategory(
      name,
      productCategoryModel
    );
  }
}
