import { AppFactory } from '../../../factory/factory';
import { ProductCategoryRequest } from '../../../modules/products/domain/schemas/dto/request/product-category.request';
import { ProductRequest } from '../../../modules/products/domain/schemas/dto/request/product.request';
import { ProductCategoryResponse } from '../../../modules/products/domain/schemas/dto/response/product-category.response';
import { ProductResponse } from '../../../modules/products/domain/schemas/dto/response/product.response';
import {
  isPositiveNumberPrompt,
  promptNonEmptyString
} from '../../../shared/validators/input-validator';
import {
  printProductCategoriesTable,
  printProductsTable
} from '../../components/form/print.custom.table';
import { ShowMessage } from '../../messages/message.util';
import readlineSync from 'readline-sync';

export class ProductsMain {
  constructor(private readonly appFactory: AppFactory) {}
  main(message: string) {
    const options: string = `Choose a option:
      1. ${ShowMessage.message('Add product', 'success', true)}
      2. ${ShowMessage.message('Update product', 'success', true)}
      3. ${ShowMessage.message('List product', 'success', true)}
      4. ${ShowMessage.message('Search product', 'success', true)}
      5. ${ShowMessage.message('Back to main', 'success', true)}`;
    let option: number = 0;

    while (true) {
      console.clear();
      console.log(options);

      option = isPositiveNumberPrompt(message);

      const isValidOption: boolean = option > 0 && option < 6;

      if (isValidOption && option < 5) {
        if (option === 1) {
          this.addProductOption();
        }
        if (option === 2) {
          this.updateProductOption();
        }
        if (option === 3) {
          this.listProductOption();
        }
        if (option === 4) {
          this.searchProductOption();
        }
        readlineSync.question('Press Enter to return to the menu...');
      } else if (option > 5) {
        console.log(
          ShowMessage.message(
            '❌ Option is not valid! Try again!',
            'error',
            true
          )
        );
        readlineSync.question('Press Enter to return to the menu...');
      }

      if (option === 5) {
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

  private listProductOption(): void {
    const productsResponse: ProductResponse[] =
      this.appFactory.productController.findAllProducts();
    printProductsTable(productsResponse, 'list of products in the database');
  }

  private searchProductOption(): void {
    const code: string = promptNonEmptyString(
      'Enter the product code to search: '
    );
    const productFound: ProductResponse | null =
      this.appFactory.productController.findProductByCode(code);
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

  private updateProductOption(): void {
    console.clear();
    console.log(
      ShowMessage.message(
        'Enter the information about the product you want to update',
        'info',
        true
      )
    );

    let code: string = '';
    while (true) {
      code = promptNonEmptyString('Enter the product code to search: ');
      const productFound: ProductResponse | null =
        this.appFactory.productController.findProductByCode(code);
      if (productFound !== null) {
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
    const name: string = promptNonEmptyString('Enter the new Name: ');
    const description: string = promptNonEmptyString(
      'Enter the new description: '
    );
    let categoryRequest: ProductCategoryRequest;
    let category: string = '';
    while (true) {
      category = promptNonEmptyString('Enter the product category: ');
      const categoryFound: ProductCategoryResponse | null =
        this.appFactory.productCategoryController.findProductCategoryByName(
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
          this.appFactory.productCategoryController.findAllProductCategories();
        printProductCategoriesTable(
          categoriesResponse,
          'Products Categories to choose'
        );
      }
    }
    const iva: number = isPositiveNumberPrompt('Enter the product IVA: ');
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
    const productResponseUpdated: ProductResponse | null =
      this.appFactory.productController.updateProduct(code, productRequest);
    if (productResponseUpdated !== null) {
      console.log(
        ShowMessage.message(
          `
      Product Code: ${productResponseUpdated.code}
      Product Name: ${productResponseUpdated.name}
      Product Description: ${productResponseUpdated.description}
      Product IVA: ${productResponseUpdated.iva}
      Product Public Price: ${productResponseUpdated.publicPrice}
      Product Supplier Price: ${productResponseUpdated.supplierPrice}
      Product Category: ${productResponseUpdated.category.name}
      Product Stock: ${productResponseUpdated.stock}
      `,
          'info'
        )
      );
      console.log(ShowMessage.message('✅ Product was updated successfully!'));
    } else {
      console.log(
        ShowMessage.message(
          '❌ Error. The product could not be updated',
          'error',
          true
        )
      );
    }
  }

  private addProductOption(): void {
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
        this.appFactory.productCategoryController.findProductCategoryByName(
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
          this.appFactory.productCategoryController.findAllProductCategories();
        printProductCategoriesTable(
          categoriesResponse,
          'Products Categories to choose'
        );
      }
    }
    const iva: number = isPositiveNumberPrompt('Enter the product IVA: ');
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
      this.appFactory.productController.createProduct(productRequest);
    if (productResponseCreated !== null) {
      console.log(
        ShowMessage.message(
          `
      Product Code: ${productResponseCreated.code}
      Product Name: ${productResponseCreated.name}
      Product Description: ${productResponseCreated.description}
      Product IVA: ${productResponseCreated.iva}
      Product Public Price: ${productResponseCreated.publicPrice}
      Product Supplier Price: ${productResponseCreated.supplierPrice}
      Product Category: ${productResponseCreated.category.name}
      Product Stock: ${productResponseCreated.stock}
      `,
          'info'
        )
      );
      console.log(ShowMessage.message('✅ Product was added successfully!'));
    } else {
      console.log(
        ShowMessage.message(
          '❌ Error. The product could not be added',
          'error',
          true
        )
      );
    }
  }
}

const appFactory: AppFactory = new AppFactory();
const productsMain: ProductsMain = new ProductsMain(appFactory);
productsMain.main('Choose a option: ');
