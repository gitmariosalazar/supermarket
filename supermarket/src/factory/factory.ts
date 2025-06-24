import { DatabaseMockup } from '../database/mockup/database';
import { DatabaseServiceMySQL } from '../database/mysql/service/mysql.service';
import { DatabaseServicePostgreSQL } from '../database/postgres/service/postgresql.service';
import { DatabaseServiceSQLServer } from '../database/sqlserver/service/sqlserver.service';
import { CartItemService } from '../modules/carts/application/services/cart-item.use-case.service';
import { CartService } from '../modules/carts/application/services/cart.use-case.service';
import { CartItemController } from '../modules/carts/infrastructure/controller/cart-item.controller';
import { CartController } from '../modules/carts/infrastructure/controller/cart.controller';
import { CartItemRepositoryMockupImplementation } from '../modules/carts/infrastructure/repositories/mockup/mockup.cart-item.persistence';
import { CartRepositoryMockupImplementation } from '../modules/carts/infrastructure/repositories/mockup/mockup.cart.persistence';
import { CustomerService } from '../modules/customers/application/services/customer.use-case.service';
import { CustomerController } from '../modules/customers/infrastructure/controller/customer.controller';
import { CustomerRepositoryMockupImplementation } from '../modules/customers/infrastructure/repositories/mockup/mockup.customer.persistence';
import { ProductCategoryService } from '../modules/products/application/services/product-category.use-case.service';
import { ProductService } from '../modules/products/application/services/product.use-case.service';
import { ProductCategoryController } from '../modules/products/infrastructure/controller/product-category.controller';
import { ProductController } from '../modules/products/infrastructure/controller/product.controller';
import { ProductCategoryMockupImplementation } from '../modules/products/infrastructure/repositories/mockup/mockup.product-category.persistence';
import { ProductRepositoryMockupImplementation } from '../modules/products/infrastructure/repositories/mockup/mockup.product.persistence';
import { ProductRepositoryMySQLImplementation } from '../modules/products/infrastructure/repositories/mysql/persistence/mysql.product.persistence';
import { ProductRepositoryPostgreSQLImplementation } from '../modules/products/infrastructure/repositories/postgres/persistence/postgres.product.persistence';
import { ProductRepositorySQLImplementation } from '../modules/products/infrastructure/repositories/sqlserver/persistence/sqlserver.product.persistence';
import { InvoiceService } from '../modules/sales/application/services/invoice.use-case.service';
import { InvoiceController } from '../modules/sales/infrastructure/controller/invoice.controller';
import { InvoiceRepositoryMockupImplementation } from '../modules/sales/infrastructure/repositories/mockup/mockup.invoice.persistence';
import { SellerService } from '../modules/sellers/application/services/seller.use-case.service';
import { SellerController } from '../modules/sellers/infrastructure/controller/seller.controller';
import { SellerRepositoryMockupImplementation } from '../modules/sellers/infrastructure/repositories/mockup/mockup.seller.persistence';

export class AppFactory {
  private databaseMockup: DatabaseMockup = new DatabaseMockup();

  //private mySQLService: DatabaseServiceMySQL = new DatabaseServiceMySQL();
  //private postgreSQLService: DatabaseServicePostgreSQL = new DatabaseServicePostgreSQL();

  //private sqlService: DatabaseServiceSQLServer = new DatabaseServiceSQLServer();

  //Implementation
  private cartRepo: CartRepositoryMockupImplementation =
    new CartRepositoryMockupImplementation(this.databaseMockup);
  private customerRepo: CustomerRepositoryMockupImplementation =
    new CustomerRepositoryMockupImplementation(this.databaseMockup);

  private productRepo: ProductRepositoryMockupImplementation =
    new ProductRepositoryMockupImplementation(this.databaseMockup);

  private sellerRepo: SellerRepositoryMockupImplementation =
    new SellerRepositoryMockupImplementation(this.databaseMockup);
  private invoiceRepo: InvoiceRepositoryMockupImplementation =
    new InvoiceRepositoryMockupImplementation(this.databaseMockup);
  private productsCategoryRepo: ProductCategoryMockupImplementation =
    new ProductCategoryMockupImplementation(this.databaseMockup);
  private cartItemRepositoryImplementation: CartItemRepositoryMockupImplementation =
    new CartItemRepositoryMockupImplementation(this.databaseMockup);

  //Services
  private cartService: CartService = new CartService(this.cartRepo);
  private customerService: CustomerService = new CustomerService(
    this.customerRepo
  );
  private productService: ProductService = new ProductService(this.productRepo);
  private sellerService: SellerService = new SellerService(this.sellerRepo);
  private invoiceService: InvoiceService = new InvoiceService(this.invoiceRepo);
  private productCategoryService: ProductCategoryService =
    new ProductCategoryService(this.productsCategoryRepo);
  private cartItemService: CartItemService = new CartItemService(
    this.cartItemRepositoryImplementation
  );

  //Controllers
  public cartController: CartController = new CartController(this.cartService);
  public customerController: CustomerController = new CustomerController(
    this.customerService
  );
  public productController: ProductController = new ProductController(
    this.productService
  );
  public sellerController: SellerController = new SellerController(
    this.sellerService
  );
  public invoiceController: InvoiceController = new InvoiceController(
    this.invoiceService
  );

  public productCategoryController: ProductCategoryController =
    new ProductCategoryController(this.productCategoryService);

  public cartItemController: CartItemController = new CartItemController(
    this.cartItemService
  );

  public getDatabase(): DatabaseMockup {
    return this.databaseMockup;
  }
}
