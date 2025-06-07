import { CartItemModel } from '../../modules/carts/domain/schemas/model/cart-items.model';
import { CartModel } from '../../modules/carts/domain/schemas/model/cart.model';
import { CustomerModel } from '../../modules/customers/domain/schemas/model/customer.model';
import { ProductCategoryModel } from '../../modules/products/domain/schemas/model/category-product.model';
import { ProductModel } from '../../modules/products/domain/schemas/model/product.model';
import { SellerModel } from '../../modules/sellers/domain/schemas/model/seller.model';
import { HashMap } from '../../shared/models/hash-map';
import { PersonModel } from '../../shared/modules/person/domain/schemas/model/person.model';
import { customersMockup } from './customers/customers';
import { personMockup } from './person/person';
import { productCategoriesMockup } from './products/product-categories';
import { productsMockup } from './products/products';
import { sellersMockup } from './sellers/sellers';

export class DatabaseMockup {
  private inventory: HashMap<string, ProductModel>;
  private categories: HashMap<string, ProductCategoryModel>;
  private peoples: HashMap<string, PersonModel>;
  private customers: HashMap<string, CustomerModel>;
  private sellers: HashMap<string, SellerModel>;
  private cartItems: HashMap<number, CartItemModel>;
  private carts: HashMap<number, CartModel>;
  //private sales: HashMap<string, SellerModel>;
  //private detailsInvoices: HashMap<string, SellerModel>;

  constructor() {
    this.inventory = new HashMap();
    this.categories = new HashMap();
    this.peoples = new HashMap();
    this.customers = new HashMap();
    this.sellers = new HashMap();
    this.cartItems = new HashMap();
    this.carts = new HashMap();
    this.initialize();
  }

  initialize(): void {
    for (let product of productsMockup) {
      this.inventory.add(
        product.code,
        new ProductModel(
          product.code,
          product.name,
          product.description,
          product.iva,
          new ProductCategoryModel(
            product.category.name,
            product.category.description
          ),
          product.stock,
          product.publicPrice,
          product.supplierPrice
        )
      );
    }
    for (let category of productCategoriesMockup) {
      this.categories.add(
        category.name,
        new ProductCategoryModel(category.name, category.description)
      );
    }
    for (let person of personMockup) {
      this.peoples.add(
        person.cardId,
        new PersonModel(
          person.cardId,
          person.firstName,
          person.lastName,
          person.email,
          person.address,
          person.phone
        )
      );
    }
    for (let customer of customersMockup) {
      const customerModel: CustomerModel = new CustomerModel(
        customer.idCustomer,
        new Date(customer.birthDate),
        customer.cardId,
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.address,
        customer.phone
      );
      this.customers.add(customer.idCustomer, customerModel);
    }
    for (let seller of sellersMockup) {
      const sellerModel: SellerModel = new SellerModel(
        seller.idSeller,
        new Date(seller.hireDate),
        seller.salary,
        seller.cardId,
        seller.firstName,
        seller.lastName,
        seller.email,
        seller.address,
        seller.phone
      );
      this.sellers.add(seller.idSeller, sellerModel);
    }
  }

  public getCarts(): HashMap<number, CartModel> {
    return this.carts;
  }

  public getCartItems(): HashMap<number, CartItemModel> {
    return this.cartItems;
  }

  public getSellers(): HashMap<string, SellerModel> {
    return this.sellers;
  }

  public getInventory(): HashMap<string, ProductModel> {
    return this.inventory;
  }

  public getCategories(): HashMap<string, ProductCategoryModel> {
    return this.categories;
  }

  public getPeoples(): HashMap<string, PersonModel> {
    return this.peoples;
  }

  public getCustomers(): HashMap<string, CustomerModel> {
    return this.customers;
  }
}
