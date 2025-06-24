import { AppFactory } from '../../../factory/factory';
import { ProductCategoryRequest } from '../../../modules/products/domain/schemas/dto/request/product-category.request';
import { ProductRequest } from '../../../modules/products/domain/schemas/dto/request/product.request';
import { ProductCategoryResponse } from '../../../modules/products/domain/schemas/dto/response/product-category.response';
import { ProductResponse } from '../../../modules/products/domain/schemas/dto/response/product.response';
import {
  isPositiveNumberMinLimitPrompt,
  isPositiveNumberPrompt,
  promptNonEmptyString
} from '../../../shared/validators/input-validator';
import {
  printProductCategoriesTable,
  printProductsTable
} from '../../components/form/print.custom.table';
import { ShowMessage } from '../../messages/message.util';
import { pause } from '../../utils/readline/read-line';

export class ProductsMain {
  constructor(private readonly appFactory: AppFactory) {}
  async main(): Promise<void> {
    const options: string = `${ShowMessage.message(
      `WELCOME TO THE PRODUCTS MODULE`,
      'title',
      true
    )}\nChoose an option:
      1. ${ShowMessage.message('Add product', 'success', true)}
      2. ${ShowMessage.message('Update product', 'success', true)}
      3. ${ShowMessage.message('List product', 'success', true)}
      4. ${ShowMessage.message('Search product', 'success', true)}
      5. ${ShowMessage.message('Stock Warning products', 'success', true)}
      6. ${ShowMessage.message('Filter products in Stock', 'success', true)}
      7. ${ShowMessage.message('Filter by category', 'success', true)}
      8. ${ShowMessage.message('See Unpurchased Products', 'success', true)}
      9. ${ShowMessage.message('See Purchased Products', 'success', true)}
      10. ${ShowMessage.message('Back to main', 'back', true)}`;
    let option: number = 0;
    const endOption: number = 10;

    while (true) {
      console.clear();
      console.log(options);

      option = isPositiveNumberPrompt('Choose an option: ');

      const isValidOption: boolean = option > 0 && option < endOption;

      if (isValidOption && option < endOption) {
        if (option === 1) {
          await this.addProductOption();
        }
        if (option === 2) {
          await this.updateProductOption();
        }
        if (option === 3) {
          await this.listProductOption();
        }
        if (option === 4) {
          await this.searchProductOption();
        }
        if (option === 5) {
          await this.listProductsWarningStock();
        }
        if (option === 6) {
          await this.listProductsBetweenStock();
        }
        if (option === 7) {
          await this.filterProductsByCategoriesOption();
        }
        if (option === 8) {
          await this.seeUnpurchasedProductsOption();
        }
        if (option === 9) {
          await this.seePurchasedProductsOption();
        }
        await pause();
      } else if (option > endOption) {
        console.log(
          ShowMessage.message(
            '❌ Option is not valid! Try again!',
            'error',
            true
          )
        );
        await pause();
      }

      if (option === endOption) {
        console.log(
          ShowMessage.message(
            'Goodbye, I hope you come back soon. 👋👋',
            'info',
            true
          )
        );
        break;
      }
    }
  }

  private async filterProductsByCategoriesOption(): Promise<void> {
    console.log(ShowMessage.message('Filtering Products by Category'));
    let categoryName: string;
    while (true) {
      categoryName = promptNonEmptyString('Enter the category name: ');
      const categoryByName: ProductCategoryResponse | null =
        await this.appFactory.productCategoryController.findProductCategoryByName(
          categoryName
        );
      const productsFound: ProductResponse[] =
        await this.appFactory.productController.findProductByCategoryName(
          categoryName
        );
      if (productsFound.length > 0) {
        if (categoryByName !== null) {
          console.log(
            ShowMessage.message(
              `Product list by Category Name: ${categoryName}`,
              'success',
              true
            )
          );
          printProductsTable(
            productsFound,
            `Products by Category name: ${categoryName}`
          );
        }
        break;
      } else {
        const categories: ProductCategoryResponse[] =
          await this.appFactory.productCategoryController.findAllProductCategories();
        console.log(
          ShowMessage.message(
            'Category not found. Please choose the following categories',
            'warning',
            true
          )
        );
        printProductCategoriesTable(categories, 'Product category List');
      }
    }
  }

  private async seePurchasedProductsOption(): Promise<void> {
    const productsFound: ProductResponse[] =
      await this.appFactory.productController.findPurchasedProducts();
    if (productsFound.length > 0) {
      printProductsTable(productsFound, 'Products List Purchased Products');
    } else {
      console.log(
        ShowMessage.message(`Purchased Products is empty!`, 'info', true)
      );
    }
  }

  private async seeUnpurchasedProductsOption(): Promise<void> {
    const productsFound: ProductResponse[] =
      await this.appFactory.productController.findUnpurchasedProducts();
    if (productsFound.length > 0) {
      printProductsTable(productsFound, 'Products List Unpurchased Products');
    } else {
      console.log(
        ShowMessage.message(`Unpurchased Products is empty!`, 'info', true)
      );
    }
  }

  private async listProductsWarningStock(): Promise<void> {
    const productsFound: ProductResponse[] =
      await this.appFactory.productController.findProductWarningStock();
    if (productsFound.length > 0) {
      printProductsTable(productsFound, 'Products List in Warning Stock');
    } else {
      console.log(
        ShowMessage.message(`Products in warning stock is empty!`, 'info', true)
      );
    }
  }

  private async listProductsBetweenStock(): Promise<void> {
    let startStock: number;
    let endStock: number;

    while (true) {
      startStock = isPositiveNumberPrompt('Enter the start stock: ');
      endStock = isPositiveNumberPrompt('Enter the end stock: ');
      const isValid: boolean = startStock < endStock;
      if (isValid) {
        const productsFound: ProductResponse[] =
          await this.appFactory.productController.findProductsBetweenStock(
            startStock,
            endStock
          );
        if (productsFound.length > 0) {
          printProductsTable(
            productsFound,
            'Products List between start and end stock'
          );
        } else {
          console.log(
            ShowMessage.message(
              `Products between start and end stock is empty!`,
              'info',
              true
            )
          );
        }
        break;
      } else {
        console.log(
          ShowMessage.message(
            'The start of stock must be less than the end of stock',
            'error',
            true
          )
        );
      }
    }
  }

  private async listProductOption(): Promise<void> {
    const productsResponse: ProductResponse[] =
      await this.appFactory.productController.findAllProducts();
    if (!productsResponse || productsResponse.length === 0) {
      console.log(ShowMessage.message('No products found.', 'info', true));
    } else {
      printProductsTable(productsResponse, 'List Products');
    }
  }

  private async searchProductOption(): Promise<void> {
    const code: string = promptNonEmptyString(
      'Enter the product code to search: '
    );
    const productFound: ProductResponse | null =
      await this.appFactory.productController.findProductByCode(code);
    if (productFound !== null) {
      printProductsTable(
        [productFound],
        `Product with code: ${code} was found successfully!`
      );
    } else {
      console.log(
        ShowMessage.message(
          `Product with code: ${code} not found!`,
          'info',
          true
        )
      );
    }
  }

  private async updateProductOption(): Promise<void> {
    //console.clear();
    let code: string = '';
    while (true) {
      code = promptNonEmptyString('Enter the product code to search: ');
      const productFound: ProductResponse | null =
        await this.appFactory.productController.findProductByCode(code);
      if (productFound !== null) {
        printProductsTable(
          [productFound],
          `Product with code: ${code} was found successfully!`
        );
        console.log(
          ShowMessage.message(
            'Enter the information about the product you want to update',
            'info',
            true
          )
        );
        const name: string = promptNonEmptyString('Enter the new Name: ');
        const description: string = promptNonEmptyString(
          'Enter the new description: '
        );
        let categoryRequest: ProductCategoryRequest;
        let category: string = '';
        while (true) {
          category = promptNonEmptyString('Enter the product category: ');
          const categoryFound: ProductCategoryResponse | null =
            await this.appFactory.productCategoryController.findProductCategoryByName(
              category
            );
          if (categoryFound !== null) {
            category = categoryFound.name;
            categoryRequest = new ProductCategoryRequest(
              categoryFound.name,
              categoryFound.description
            );
            break;
          } else {
            console.log(
              ShowMessage.message(
                'Category product not found!',
                'warning',
                true
              )
            );
            const categoriesResponse: ProductCategoryResponse[] | null =
              await this.appFactory.productCategoryController.findAllProductCategories();
            printProductCategoriesTable(
              categoriesResponse,
              'Products Categories to choose'
            );
          }
        }
        const iva: number = isPositiveNumberMinLimitPrompt(
          'Enter the product IVA: ',
          0
        );
        const stock: number = isPositiveNumberPrompt(
          'Enter the product stock: '
        );
        const supplierPrice: number = isPositiveNumberPrompt(
          'Enter the supplier price: '
        );
        const productRequest: ProductRequest = new ProductRequest(
          code,
          name,
          description,
          iva,
          categoryRequest,
          stock,
          supplierPrice
        );
        const productResponseUpdated: ProductResponse | null =
          await this.appFactory.productController.updateProduct(
            code,
            productRequest
          );
        if (productResponseUpdated !== null) {
          printProductsTable(
            [productResponseUpdated],
            `Product with code: ${code} updated`
          );
          console.log(
            ShowMessage.message(
              'Product was updated successfully!',
              'success',
              true
            )
          );
        } else {
          console.log(
            ShowMessage.message(
              'Error. The product could not be updated',
              'error',
              true
            )
          );
        }
        break;
      } else {
        console.log(
          ShowMessage.message(
            `Product with code: ${code} not found, Try again!`,
            'error',
            true
          )
        );
      }
    }
  }

  private async addProductOption(): Promise<void> {
    console.clear();
    console.log(
      ShowMessage.message(
        'Enter the information about the product you want to insert',
        'info',
        true
      )
    );

    const code: string = promptNonEmptyString('Enter the product code: ');
    const name: string = promptNonEmptyString('Enter the product name: ');
    const description: string = promptNonEmptyString(
      'Enter the product description: '
    );
    let categoryRequest: ProductCategoryRequest;
    let category: string = '';
    while (true) {
      category = promptNonEmptyString('Enter the product category: ');
      const categoryFound: ProductCategoryResponse | null =
        await this.appFactory.productCategoryController.findProductCategoryByName(
          category
        );
      if (categoryFound !== null) {
        category = categoryFound.name;
        categoryRequest = new ProductCategoryRequest(
          categoryFound.name,
          categoryFound.description
        );
        break;
      } else {
        console.log(
          ShowMessage.message('Category product not found!', 'warning', true)
        );
        const categoriesResponse: ProductCategoryResponse[] | null =
          await this.appFactory.productCategoryController.findAllProductCategories();
        printProductCategoriesTable(
          categoriesResponse,
          'Products Categories to choose'
        );
      }
    }
    const iva: number = isPositiveNumberMinLimitPrompt(
      'Enter the product IVA: ',
      0
    );
    const stock: number = isPositiveNumberPrompt('Enter the product stock: ');
    const supplierPrice: number = isPositiveNumberPrompt(
      'Enter the supplier price: '
    );
    const productRequest: ProductRequest = new ProductRequest(
      code,
      name,
      description,
      iva,
      categoryRequest,
      stock,
      supplierPrice
    );
    const productResponseCreated: ProductResponse | null =
      await this.appFactory.productController.createProduct(productRequest);
    if (productResponseCreated !== null) {
      printProductsTable(
        [productResponseCreated],
        'New product was added successfully!'
      );
      console.log(
        ShowMessage.message('Product was added successfully!', 'success', true)
      );
    } else {
      console.log(
        ShowMessage.message(
          'Error. The product could not be added',
          'error',
          true
        )
      );
    }
  }
}
