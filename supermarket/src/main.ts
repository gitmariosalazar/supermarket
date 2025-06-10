import { DatabaseMockup } from './database/mockup/database';
import { CartService } from './modules/carts/application/services/cart.use-case.service';
import { CartItemRequest } from './modules/carts/domain/schemas/dto/request/cart-item.request';
import { CartRequest } from './modules/carts/domain/schemas/dto/request/cart.request';
import { CartResponse } from './modules/carts/domain/schemas/dto/response/cart.response';
import { CartItemModel } from './modules/carts/domain/schemas/model/cart-items.model';
import { CartModel } from './modules/carts/domain/schemas/model/cart.model';
import { CartAdapter } from './modules/carts/infrastructure/adapters/cart.adapter';
import { CartController } from './modules/carts/infrastructure/controller/cart.controller';
import { CartRepositoryMockupImplementation } from './modules/carts/infrastructure/repositories/mockup/mockup.cart.persistence';
import { CustomerService } from './modules/customers/application/services/customer.use-case.service';
import { CustomerRequest } from './modules/customers/domain/schemas/dto/request/customer.request';
import { CustomerResponse } from './modules/customers/domain/schemas/dto/response/customer.response';
import { CustomerController } from './modules/customers/infrastructure/controller/customer.controller';
import { CustomerRepositoryMockupImplementation } from './modules/customers/infrastructure/repositories/mockup/mockup.customer.persistence';
import { ProductCategoryService } from './modules/products/application/services/product-category.use-case.service';
import { ProductService } from './modules/products/application/services/product.use-case.service';
import { ProductCategoryRequest } from './modules/products/domain/schemas/dto/request/product-category.request';
import { ProductRequest } from './modules/products/domain/schemas/dto/request/product.request';
import { ProductResponse } from './modules/products/domain/schemas/dto/response/product.response';
import { ProductCategoryModel } from './modules/products/domain/schemas/model/category-product.model';
import { ProductModel } from './modules/products/domain/schemas/model/product.model';
import { ProductAdapter } from './modules/products/infrastructure/adapters/product.adapter';
import { ProductCategoryController } from './modules/products/infrastructure/controller/product-category.controller';
import { ProductController } from './modules/products/infrastructure/controller/product.controller';
import { ProductCategoryMockupImplementation } from './modules/products/infrastructure/repositories/mockup/mockup.product-category.persistence';
import { ProductRepositoryMockupImplementation } from './modules/products/infrastructure/repositories/mockup/mockup.product.persistence';
import { InvoiceService } from './modules/sales/application/services/invoice.use-case.service';
import { InvoiceRequest } from './modules/sales/domain/schemas/dto/request/invoice.request';
import { InvoiceResponse } from './modules/sales/domain/schemas/dto/response/invoice.response';
import { InvoiceModel } from './modules/sales/domain/schemas/model/invoice.model';
import { InvoiceController } from './modules/sales/infrastructure/controller/invoice.controller';
import { InvoiceRepositoryMockupImplementation } from './modules/sales/infrastructure/repositories/mockup/mockup.invoice.persistence';
import { SellerService } from './modules/sellers/application/services/seller.use-case.service';
import { SellerRequest } from './modules/sellers/domain/schemas/dto/request/seller.request';
import { SellerResponse } from './modules/sellers/domain/schemas/dto/response/seller.response';
import { SellerAdapter } from './modules/sellers/infrastructure/adapters/seller.adapter';
import { SellerController } from './modules/sellers/infrastructure/controller/seller.controller';
import { SellerRepositoryMockupImplementation } from './modules/sellers/infrastructure/repositories/mockup/mockup.seller.persistence';
import {
  printCustomersTable,
  printListTable,
  printProductsTable,
  printSellersTable,
  printTableWithItems
} from './ui/components/form/print.custom.table';
import { ShowMessage } from './ui/messages/message.util';

const databaseMockup: DatabaseMockup = new DatabaseMockup();

const cartMockupRepositoryImp: CartRepositoryMockupImplementation =
  new CartRepositoryMockupImplementation(databaseMockup);

const cartService: CartService = new CartService(cartMockupRepositoryImp);

const cartController: CartController = new CartController(cartService);

const sellerMockupRepositoryImp: SellerRepositoryMockupImplementation =
  new SellerRepositoryMockupImplementation(databaseMockup);
const sellerService: SellerService = new SellerService(
  sellerMockupRepositoryImp
);
const sellerController: SellerController = new SellerController(sellerService);

const customerMockupRepository: CustomerRepositoryMockupImplementation =
  new CustomerRepositoryMockupImplementation(databaseMockup);
const customerService: CustomerService = new CustomerService(
  customerMockupRepository
);
const customerController: CustomerController = new CustomerController(
  customerService
);

const productCategoryMockupRepository: ProductCategoryMockupImplementation =
  new ProductCategoryMockupImplementation(databaseMockup);

const productCategoryService: ProductCategoryService =
  new ProductCategoryService(productCategoryMockupRepository);

const productCategoryController: ProductCategoryController =
  new ProductCategoryController(productCategoryService);

const productMockupRepository: ProductRepositoryMockupImplementation =
  new ProductRepositoryMockupImplementation(databaseMockup);

const productService: ProductService = new ProductService(
  productMockupRepository
);

const productController: ProductController = new ProductController(
  productService
);

const customer: CustomerResponse =
  customerController.findCustomerById('CUST003')!;
const cartRequest: CartRequest = new CartRequest(
  new CustomerRequest(
    customer?.idCustomer,
    customer?.birthDate,
    customer?.person.cardId,
    customer?.person.firstName,
    customer?.person.lastName,
    customer?.person.email,
    customer?.person.address,
    customer?.person.phone
  ),
  [],
  1
);

const product1: ProductResponse | null =
  productController.findProductByCode('ELEC004');

const product2: ProductResponse | null =
  productController.findProductByCode('BOOK005');
const product3: ProductResponse | null =
  productController.findProductByCode('CLOTH005');
const product4: ProductResponse | null =
  productController.findProductByCode('APPL005');

const productRequest1: ProductRequest =
  ProductAdapter.productResponseToProductRequest(product1!);
const cartItemRequest1: CartItemRequest = new CartItemRequest(
  cartRequest,
  productRequest1,
  2,
  1
);

const productRequest2: ProductRequest =
  ProductAdapter.productResponseToProductRequest(product2!);
const cartItemRequest2: CartItemRequest = new CartItemRequest(
  cartRequest,
  productRequest2,
  2,
  1
);

const productRequest3: ProductRequest =
  ProductAdapter.productResponseToProductRequest(product3!);
const cartItemRequest3: CartItemRequest = new CartItemRequest(
  cartRequest,
  productRequest3,
  2,
  1
);

const productRequest4: ProductRequest =
  ProductAdapter.productResponseToProductRequest(product4!);
const cartItemRequest4: CartItemRequest = new CartItemRequest(
  cartRequest,
  productRequest4,
  2,
  1
);

cartRequest.addToCart(cartItemRequest1);
cartRequest.addToCart(cartItemRequest2);
cartRequest.addToCart(cartItemRequest3);
cartRequest.addToCart(cartItemRequest4);
console.log(cartRequest.cartItems.getTable().values());

const createdCart: CartResponse | null = cartController.createCart(cartRequest);
console.log(ShowMessage.message('Create cart\n', 'info'));
console.log(createdCart?.cartItems);
console.log(databaseMockup.getCarts());
const invoiceRepository: InvoiceRepositoryMockupImplementation =
  new InvoiceRepositoryMockupImplementation(databaseMockup);
const invoiceService: InvoiceService = new InvoiceService(invoiceRepository);
const invoiceController: InvoiceController = new InvoiceController(
  invoiceService
);

const sellerFound: SellerResponse =
  sellerController.findSellerById('SELLER002')!;
const sellerRequest: SellerRequest =
  SellerAdapter.sellerResponseToSellerRequest(sellerFound);
const invoiceRequest: InvoiceRequest = new InvoiceRequest(
  sellerRequest,
  cartRequest
);

console.log(ShowMessage.message('Message Error', 'error'));
console.log(invoiceController.findAllInvoices());
console.log(ShowMessage.message('Message Warning', 'warning'));
console.log(invoiceController.createInvoice(invoiceRequest));
console.log(ShowMessage.message('Message Info', 'info'));
console.log(invoiceController.findAllInvoices()[0].cart.customer);
console.log(ShowMessage.message('Message Success', 'success'));
const invoicesResponses: InvoiceResponse[] =
  invoiceController.findAllInvoices();
printListTable(invoicesResponses, 'Invoices List');
const ir1: InvoiceResponse = invoicesResponses[0];
printTableWithItems(ir1, 'Invoice List with items');

const ir3: InvoiceModel = databaseMockup.getInvoices().find(0)!;
printTableWithItems(ir3, 'Invoice Model');
printTableWithItems(cartRequest, 'Cart Request');
/*
console.log(ShowMessage.message('Message Reset'));
const customerResponseList: CustomerResponse[] =
  customerController.findAllCustomers();
printCustomersTable(customerResponseList);

const productsResponse: ProductResponse[] = productController.findAllProducts();
printProductsTable(productsResponse);

const sellersResponse: SellerResponse[] = sellerController.findAllSellers();
printSellersTable(sellersResponse);
*/
