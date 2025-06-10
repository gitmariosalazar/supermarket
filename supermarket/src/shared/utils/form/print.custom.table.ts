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
import { HashMap } from '../../models/hash-map';
import { formatDate } from '../format/format-date';
import {
  CustomerData,
  FooterDetails,
  ItemData,
  ListData,
  ProductData,
  SellerData
} from './models.data.interface';
import { printTable } from './table';

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
        salary: sellerResponse.salary,
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
        salary: seller.getSalary(),
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
        iva: productResponse.iva,
        category: productResponse.category.name,
        stock: productResponse.stock,
        publicPrice: Number(productResponse.publicPrice.toFixed(3)),
        supplierPrice: productResponse.supplierPrice
      });
    });
  } else {
    for (const productModel of products.getTable().values()) {
      dataTable.push({
        code: productModel.getCode(),
        name: productModel.getName(),
        description: productModel.getDescription(),
        iva: productModel.getIva(),
        category: productModel.getCategory().getName(),
        stock: productModel.getStock(),
        publicPrice: Number(productModel.getSupplierPrice().toFixed(3)),
        supplierPrice: productModel.getSupplierPrice()
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
        console.log(`first`, item.seller.idSeller);
        dataTable.push({
          id: item.idInvoice,
          idSeller: item.seller.idSeller,
          seller:
            item.seller.person.firstName + ' ' + item.seller.person.lastName,
          idCustomer: item.cart.customer.idCustomer,
          customer:
            item.cart.customer.person.firstName +
            ' ' +
            item.cart.customer.person.lastName,
          date: formatDate(new Date()),
          subtotal: item.subtotal,
          iva: item.iva,
          total: item.total
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
          id: item.idCart!,
          idCustomer: item.customer.idCustomer,
          customer:
            item.customer.person.firstName +
            ' ' +
            item.customer.person.lastName,
          date: formatDate(new Date()),
          subtotal: item.subtotal,
          iva: item.iva,
          total: item.total
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
          id: invoice.getIdInvoice(),
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
          subtotal: invoice.getSubtotal(),
          iva: invoice.getIva(),
          total: invoice.getTotal()
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
          id: invoice.getIdCart(),
          idCustomer: invoice.getCustomer().getIdCustomer(),
          customer:
            invoice.getCustomer().getFirstName() +
            ' ' +
            invoice.getCustomer().getLastName(),
          date: formatDate(new Date()),
          subtotal: invoice.getSubtotal(),
          iva: invoice.getIva(),
          total: invoice.getTotal()
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
  if (data instanceof InvoiceModel) {
    const customer: CustomerModel = data.getCart().getCustomer();
    const seller: SellerModel = data.getSalesman();
    const items: HashMap<string, CartItemModel> = data.getCart().getCartItems();
    footerDetails.subtotal = data.getSubtotal();
    footerDetails.iva = data.getIva();
    footerDetails.total = data.getTotal();
    Array.from(items.getTable().values()).forEach((item) => {
      dataTable.push({
        code: item.getProduct().getCode(),
        name: item.getProduct().getName(),
        quantity: item.getQuantity(),
        unitPrice: item.getProduct().getPublicPrice(),
        subtotal: item.getTotalPrice(),
        iva: item.getTotalPrice(),
        totalPrice: item.getTotalPrice()
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
        quantity: item.quantity,
        unitPrice: item.product.publicPrice,
        subtotal: item.product.publicPrice,
        iva: item.product.publicPrice,
        totalPrice: item.product.publicPrice
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
        quantity: item.getQuantity(),
        unitPrice: item.getProduct().getPublicPrice(),
        subtotal: item.getTotalPrice(),
        iva: item.getTotalPrice(),
        totalPrice: item.getTotalPrice()
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
        quantity: item.quantity,
        unitPrice: item.product.publicPrice!,
        subtotal: item.quantity,
        iva: item.quantity,
        totalPrice: item.quantity
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
        quantity: item.quantity,
        unitPrice: item.product.publicPrice,
        subtotal: item.product.publicPrice,
        iva: item.product.publicPrice,
        totalPrice: item.product.publicPrice
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
  } else {
    console.error('Type unknown');
  }
};
