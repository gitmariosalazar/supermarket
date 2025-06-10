export interface ProductData {
  code: string;
  name: string;
  description: string;
  iva: number;
  category: string;
  stock: number;
  publicPrice: number;
  supplierPrice: number;
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
  salary: number;
  cardId: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
}

export interface ItemData {
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  iva: number;
  totalPrice: number;
}

export interface ListData {
  id: number;
  idSeller?: string;
  seller?: string;
  idCustomer?: string;
  customer?: string;
  date: Date | string;
  subtotal: number;
  iva: number;
  total: number;
}

export interface FooterDetails {
  subtotal: number;
  iva: number;
  total: number;
}
