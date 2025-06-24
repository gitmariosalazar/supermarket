import { DatabaseMockup } from '../../../../../database/mockup/database';
import { HashMap } from '../../../../../shared/models/hash-map';
import { InterfaceProductCategoryRepository } from '../../../domain/contracts/product-category.repository.interface';
import { ProductCategoryResponse } from '../../../domain/schemas/dto/response/product-category.response';
import { ProductCategoryModel } from '../../../domain/schemas/model/category-product.model';
import { ProductCategoryAdapter } from '../../adapters/product-category.adapter';

export class ProductCategoryMockupImplementation
  implements InterfaceProductCategoryRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  async findAllProductCategories(): Promise<ProductCategoryResponse[]> {
    return Array.from(
      this.databaseMockup.getCategories().getTable().values()
    ).map(ProductCategoryAdapter.productCategoryModelToProductCategoryResponse);
  }

  async findProductCategoryByName(
    name: string
  ): Promise<ProductCategoryResponse | null> {
    const categoryFound: ProductCategoryModel | undefined = this.databaseMockup
      .getCategories()
      .find(name);
    return categoryFound !== undefined
      ? ProductCategoryAdapter.productCategoryModelToProductCategoryResponse(
          categoryFound
        )
      : null;
  }

  async createProductCategory(
    productCategoryModel: ProductCategoryModel
  ): Promise<ProductCategoryResponse | null> {
    const categoryCreated: ProductCategoryModel | undefined =
      this.databaseMockup
        .getCategories()
        .add(productCategoryModel.getName(), productCategoryModel);
    return categoryCreated !== undefined
      ? ProductCategoryAdapter.productCategoryModelToProductCategoryResponse(
          categoryCreated
        )
      : null;
  }

  async updateProductCategory(
    name: string,
    productCategoryModel: ProductCategoryModel
  ): Promise<ProductCategoryResponse | null> {
    const categoryCreated: ProductCategoryModel | undefined =
      await this.databaseMockup
        .getCategories()
        .update(name, productCategoryModel);
    return categoryCreated !== undefined
      ? ProductCategoryAdapter.productCategoryModelToProductCategoryResponse(
          categoryCreated
        )
      : null;
  }
}
