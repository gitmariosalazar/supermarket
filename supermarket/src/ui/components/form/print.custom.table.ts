import { CartItemRequest } from '../../../modules/carts/domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../../modules/carts/domain/schemas/dto/request/cart.request';
import { CartItemResponse } from '../../../modules/carts/domain/schemas/dto/response/cart-item.response';
import { CartResponse } from '../../../modules/carts/domain/schemas/dto/response/cart.response';
import { CartItemModel } from '../../../modules/carts/domain/schemas/model/cart-items.model';
import { CartModel } from '../../../modules/carts/domain/schemas/model/cart.model';
import { CustomerRequest } from '../../../modules/customers/domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../../modules/customers/domain/schemas/dto/response/customer.response';
import { CustomerModel } from '../../../modules/customers/domain/schemas/model/customer.model';
import { ProductResponse } from '../../../modules/products/domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../modules/products/domain/schemas/model/product.model';
import { InvoiceResponse } from '../../../modules/sales/domain/schemas/dto/response/invoice.response';
import { InvoiceModel } from '../../../modules/sales/domain/schemas/model/invoice.model';
import { SellerResponse } from '../../../modules/sellers/domain/schemas/dto/response/seller.response';
import { SellerModel } from '../../../modules/sellers/domain/schemas/model/seller.model';
import { HashMap } from '../../../shared/models/hash-map';
import { formatDate } from '../../utils/format/format-date';
import {
  CustomerData,
  FooterDetails,
  ItemData,
  ListData,
  ListQueueData,
  ProductCategoryData,
  ProductData,
  SellerData
} from '../../interfaces/models.data.interface';
import { printTable } from './table';
import { ProductCategoryModel } from '../../../modules/products/domain/schemas/model/category-product.model';
import { ProductCategoryResponse } from '../../../modules/products/domain/schemas/dto/response/product-category.response';
import { ShowMessage } from '../../messages/message.util';
import { PriorityQueue } from '../../../shared/models/queue';

export const printProductCategoriesTable = (
  productCategories:
    | HashMap<string, ProductCategoryModel>
    | ProductCategoryResponse[],
  title: string
) => {
  const dataTable: ProductCategoryData[] = [];
  const headersColumns: string[] = ['name', 'description'];

  if (Array.isArray(productCategories)) {
    productCategories.forEach((categoryResponse) => {
      dataTable.push({
        name: categoryResponse.name,
        description: categoryResponse.description
      });
    });
  } else {
    for (const category of productCategories.getTable().values()) {
      dataTable.push({
        name: category.getName(),
        description: category.getDescription()
      });
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printCustomersTable = (
  customers: HashMap<string, CustomerModel> | CustomerResponse[],
  title: string
) => {
  const dataTable: CustomerData[] = [];
  const headersColumns: string[] = [
    'idCustomer',
    'birthDate',
    'cardId',
    'fullName',
    'email',
    'address',
    'phone'
  ];

  if (Array.isArray(customers)) {
    customers.forEach((customerResponse) => {
      dataTable.push({
        idCustomer: customerResponse.idCustomer,
        birthDate: formatDate(customerResponse.birthDate),
        cardId: customerResponse.person.cardId,
        fullName: `${customerResponse.person.firstName} ${customerResponse.person.lastName}`,
        email: customerResponse.person.email,
        address: customerResponse.person.address,
        phone: customerResponse.person.phone
      });
    });
  } else {
    for (const customer of customers.getTable().values()) {
      dataTable.push({
        idCustomer: customer.getIdCustomer(),
        birthDate: formatDate(customer.getBirthDate()),
        cardId: customer.getCardId(),
        fullName: `${customer.getFirstName()} ${customer.getLastName()}`,
        email: customer.getEmail(),
        address: customer.getAddress(),
        phone: customer.getPhone()
      });
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printSellersTable = (
  sellers: HashMap<string, SellerModel> | SellerResponse[],
  title: string
) => {
  const dataTable: SellerData[] = [];
  const headersColumns: string[] = [
    'idSeller',
    'hireDate',
    'cardId',
    'fullName',
    'email',
    'address',
    'phone'
  ];

  if (Array.isArray(sellers)) {
    sellers.forEach((sellerResponse) => {
      dataTable.push({
        idSeller: sellerResponse.idSeller,
        hireDate: formatDate(sellerResponse.hireDate),
        salary: sellerResponse.salary.toFixed(2),
        cardId: sellerResponse.person.cardId,
        fullName: `${sellerResponse.person.firstName} ${sellerResponse.person.lastName}`,
        email: sellerResponse.person.email,
        address: sellerResponse.person.address,
        phone: sellerResponse.person.phone
      });
    });
  } else {
    for (const seller of sellers.getTable().values()) {
      dataTable.push({
        idSeller: seller.getIdSeller(),
        hireDate: formatDate(seller.getHireDate()),
        salary: seller.getSalary().toFixed(2),
        cardId: seller.getCardId(),
        fullName: `${seller.getFirstName()} ${seller.getLastName()}`,
        email: seller.getEmail(),
        address: seller.getAddress(),
        phone: seller.getPhone()
      });
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printProductsTable = (
  products: HashMap<string, ProductModel> | ProductResponse[],
  title: string
) => {
  const dataTable: ProductData[] = [];
  const headersColumns: string[] = [
    'code',
    'name',
    'description',
    'iva',
    'category',
    'stock',
    'publicPrice',
    'supplierPrice'
  ];

  if (Array.isArray(products)) {
    products.forEach((productResponse) => {
      dataTable.push({
        code: productResponse.code,
        name: productResponse.name,
        description: productResponse.description,
        iva: productResponse.iva.toFixed(2),
        category: productResponse.category.name,
        stock: productResponse.stock.toFixed(0),
        publicPrice: productResponse.publicPrice.toFixed(2),
        supplierPrice: productResponse.supplierPrice.toFixed(2)
      });
    });
  } else {
    for (const productModel of products.getTable().values()) {
      dataTable.push({
        code: productModel.getCode(),
        name: productModel.getName(),
        description: productModel.getDescription(),
        iva: productModel.getIva().toFixed(2),
        category: productModel.getCategory().getName(),
        stock: productModel.getStock().toFixed(0),
        publicPrice: productModel.getSupplierPrice().toFixed(2),
        supplierPrice: productModel.getSupplierPrice().toFixed(2)
      });
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printListTable = (
  list:
    | HashMap<number, InvoiceModel | CartModel>
    | InvoiceResponse[]
    | CartResponse[],
  title: string
) => {
  const dataTable: ListData[] = [];
  let headersColumns: string[] = [];

  function isInvoiceResponse(obj: any): obj is InvoiceResponse {
    return 'idInvoice' in obj;
  }

  function isCartResponse(obj: any): obj is CartResponse {
    return 'idCart' in obj;
  }

  if (Array.isArray(list)) {
    list.forEach((item) => {
      if (isInvoiceResponse(item)) {
        dataTable.push({
          id: item.idInvoice.toFixed(0),
          idSeller: item.seller.idSeller,
          seller:
            item.seller.person.firstName + ' ' + item.seller.person.lastName,
          idCustomer: item.cart.customer.idCustomer,
          customer:
            item.cart.customer.person.firstName +
            ' ' +
            item.cart.customer.person.lastName,
          date: formatDate(new Date()),
          subtotal: item.subtotal.toFixed(2),
          iva: item.iva.toFixed(2),
          total: item.total.toFixed(2)
        });
        headersColumns = [
          'id',
          'idSeller',
          'seller',
          'idCustomer',
          'customer',
          'date',
          'subtotal',
          'iva',
          'total'
        ];
        title = 'Invoice List';
      } else if (isCartResponse(item)) {
        dataTable.push({
          id: item.idCart!.toFixed(0),
          idCustomer: item.customer.idCustomer,
          customer:
            item.customer.person.firstName +
            ' ' +
            item.customer.person.lastName,
          date: formatDate(new Date()),
          subtotal: item.subtotal.toFixed(2),
          iva: item.iva.toFixed(2),
          total: item.total.toFixed(2)
        });
        headersColumns = [
          'id',
          'idCustomer',
          'customer',
          'date',
          'subtotal',
          'iva',
          'total'
        ];
      }
    });
  } else {
    for (const invoice of list.getTable().values()) {
      if (invoice instanceof InvoiceModel) {
        dataTable.push({
          id: invoice.getIdInvoice().toFixed(0),
          idSeller: invoice.getSalesman().getIdSeller(),
          seller:
            invoice.getSalesman().getFirstName() +
            ' ' +
            invoice.getSalesman().getLastName(),
          idCustomer: invoice.getCart().getCustomer().getIdCustomer(),
          customer:
            invoice.getCart().getCustomer().getFirstName() +
            ' ' +
            invoice.getCart().getCustomer().getLastName(),
          date: formatDate(new Date()),
          subtotal: invoice.getSubtotal().toFixed(2),
          iva: invoice.getIva().toFixed(2),
          total: invoice.getTotal().toFixed(2)
        });
        headersColumns = [
          'id',
          'idSeller',
          'seller',
          'idCustomer',
          'customer',
          'date',
          'subtotal',
          'iva',
          'total'
        ];
      } else {
        dataTable.push({
          id: invoice.getIdCart().toFixed(0),
          idCustomer: invoice.getCustomer().getIdCustomer(),
          customer:
            invoice.getCustomer().getFirstName() +
            ' ' +
            invoice.getCustomer().getLastName(),
          date: formatDate(new Date()),
          subtotal: invoice.getSubtotal().toFixed(2),
          iva: invoice.getIva().toFixed(2),
          total: invoice.getTotal().toFixed(2)
        });
        headersColumns = [
          'id',
          'idCustomer',
          'customer',
          'date',
          'subtotal',
          'iva',
          'total'
        ];
      }
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printListQueueTable = (
  list: PriorityQueue<CartRequest>,
  title: string
) => {
  const sortedQueue: { turn: number; priority: number; data: CartRequest }[] =
    list.getSortedQueueByPriority();
  const dataTable: ListQueueData[] = [];
  let headersColumns: string[] = [
    'id',
    'idCustomer',
    'customer',
    'date',
    'subtotal',
    'iva',
    'total',
    'priority',
    'turn'
  ];
  for (const { turn, priority, data } of sortedQueue) {
    dataTable.push({
      id: data.idCart!.toFixed(0),
      idCustomer: data.customer.idCustomer,
      customer: data.customer.firstName + ' ' + data.customer.lastName,
      date: formatDate(new Date()),
      subtotal: data.subtotal!.toFixed(2),
      iva: data.iva!.toFixed(2),
      total: data.total!.toFixed(2),
      priority: priority.toFixed(0),
      turn: turn.toFixed(0)
    });
  }
  printTable(dataTable, headersColumns, title);
};

export const printListQueueTableAux = (list: CartRequest[], title: string) => {
  const dataTable: ListQueueData[] = [];
  let headersColumns: string[] = [];
  for (const item of list) {
    if (item instanceof CartRequest) {
      dataTable.push({
        id: item.idCart!.toFixed(0),
        idCustomer: item.customer.idCustomer,
        customer: item.customer.firstName + ' ' + item.customer.lastName,
        date: formatDate(new Date()),
        subtotal: item.subtotal!.toFixed(2),
        iva: item.iva!.toFixed(2),
        total: item.total!.toFixed(2),
        priority: '0',
        turn: '0'
      });
      headersColumns = [
        'id',
        'idCustomer',
        'customer',
        'date',
        'subtotal',
        'iva',
        'total',
        'priority'
      ];
    }
  }
  printTable(dataTable, headersColumns, title);
};

export const printTableWithItems = (
  data: InvoiceModel | InvoiceResponse | CartModel | CartResponse | CartRequest,
  title: string
) => {
  const dataTable: ItemData[] = [];
  const footerDetails: FooterDetails = {
    subtotal: 0,
    iva: 0,
    total: 0
  };
  const headersColumns: string[] = [
    'code',
    'name',
    'quantity',
    'unitPrice',
    'subtotal',
    'iva',
    'totalPrice'
  ];
  if (data !== null) {
    if (data instanceof InvoiceModel) {
      const customer: CustomerModel = data.getCart().getCustomer();
      const seller: SellerModel = data.getSalesman();
      const items: HashMap<string, CartItemModel> = data
        .getCart()
        .getCartItems();
      footerDetails.subtotal = data.getSubtotal();
      footerDetails.iva = data.getIva();
      footerDetails.total = data.getTotal();
      Array.from(items.getTable().values()).forEach((item) => {
        dataTable.push({
          code: item.getProduct().getCode(),
          name: item.getProduct().getName(),
          quantity: item.getQuantity().toFixed(0),
          unitPrice: item.getProduct().getPublicPrice().toFixed(2),
          subtotal: item.getSubtotal().toFixed(2),
          iva: item.getIva().toFixed(2),
          totalPrice: item.getTotalPrice().toFixed(2)
        });
      });
      printTable(
        dataTable,
        headersColumns,
        title,
        customer,
        seller,
        footerDetails
      );
    } else if (data instanceof CartModel) {
      const customer: CustomerModel = data.getCustomer();
      const items: HashMap<string, CartItemModel> = data.getCartItems();
      footerDetails.subtotal = data.getSubtotal();
      footerDetails.iva = data.getIva();
      footerDetails.total = data.getTotal();
      Array.from(items.getTable().values()).forEach((item) => {
        dataTable.push({
          code: item.getProduct().getCode(),
          name: item.getProduct().getName(),
          quantity: item.getQuantity().toFixed(2),
          unitPrice: item.getProduct().getPublicPrice().toFixed(2),
          subtotal: item.getSubtotal().toFixed(2),
          iva: item.getIva().toFixed(2),
          totalPrice: item.getTotalPrice().toFixed(2)
        });
      });
      printTable(
        dataTable,
        headersColumns,
        title,
        customer,
        undefined,
        footerDetails
      );
    } else if (data instanceof CartRequest) {
      const customer: CustomerRequest = data.customer;
      const items: HashMap<string, CartItemRequest> = data.cartItems;
      footerDetails.subtotal = data.subtotal!;
      footerDetails.iva = data.iva!;
      footerDetails.total = data.total!;
      Array.from(items.getTable().values()).forEach((item) => {
        dataTable.push({
          code: item.product.code,
          name: item.product.name,
          quantity: item.quantity.toFixed(0),
          unitPrice: item.product.publicPrice!.toFixed(2),
          subtotal: item.subtotal!.toFixed(2),
          iva: item.iva!.toFixed(2),
          totalPrice: item.totalPrice!.toFixed(2)
        });
      });
      printTable(
        dataTable,
        headersColumns,
        title,
        customer,
        undefined,
        footerDetails
      );
    } else if ('idCart' in data) {
      const customer: CustomerResponse = data.customer;
      const items: CartItemResponse[] = data.cartItems;
      footerDetails.subtotal = data.subtotal;
      footerDetails.iva = data.iva;
      footerDetails.total = data.total;
      items.forEach((item) => {
        dataTable.push({
          code: item.product.code,
          name: item.product.name,
          quantity: item.quantity.toFixed(1),
          unitPrice: item.unitPrice.toFixed(2),
          subtotal: item.subtotal.toFixed(2),
          iva: item.iva.toFixed(2),
          totalPrice: item.totalPrice.toFixed(2)
        });
      });
      printTable(
        dataTable,
        headersColumns,
        title,
        customer,
        undefined,
        footerDetails
      );
    } else if ('idInvoice' in data) {
      const customer: CustomerResponse = data.cart.customer;
      const seller: SellerResponse = data.seller;
      const items: CartItemResponse[] = data.cart.cartItems;
      footerDetails.subtotal = data.subtotal;
      footerDetails.iva = data.iva;
      footerDetails.total = data.total;
      items.forEach((item) => {
        dataTable.push({
          code: item.product.code,
          name: item.product.name,
          quantity: item.quantity.toFixed(0),
          unitPrice: item.unitPrice.toFixed(2),
          subtotal: item.subtotal.toFixed(2),
          iva: item.iva.toFixed(2),
          totalPrice: item.totalPrice.toFixed(2)
        });
      });
      printTable(
        dataTable,
        headersColumns,
        title,
        customer,
        seller,
        footerDetails
      );
    } else {
      console.error(ShowMessage.message(`Type unknown!`, 'error', true));
    }
  } else {
    console.log(ShowMessage.message(`No records found!`, 'error', true));
  }
};
