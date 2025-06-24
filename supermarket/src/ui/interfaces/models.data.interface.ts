export interface ProductData {
  code: string;
  name: string;
  description: string;
  iva: string;
  category: string;
  stock: string;
  publicPrice: string;
  supplierPrice: string;
}

export interface CustomerData {
  idCustomer: string;
  birthDate: Date | string;
  cardId: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
}

export interface SellerData {
  idSeller: string;
  hireDate: Date | string;
  salary: string;
  cardId: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
}

export interface ItemData {
  code: string;
  name: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
  iva: string;
  totalPrice: string;
}

export interface ListData {
  id: string;
  idSeller?: string;
  seller?: string;
  idCustomer?: string;
  customer?: string;
  date: Date | string;
  subtotal: string;
  iva: string;
  total: string;
}

export interface ListQueueData {
  id: string;
  idCustomer?: string;
  customer?: string;
  date: Date | string;
  subtotal: string;
  iva: string;
  total: string;
  priority: string;
  turn: string;
}

export interface FooterDetails {
  subtotal: number;
  iva: number;
  total: number;
}

export interface ProductCategoryData {
  name: string;
  description: string;
}
