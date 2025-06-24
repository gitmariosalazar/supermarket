import { CartResponse } from '../../../../../carts/domain/schemas/dto/response/cart.response';
import { SellerResponse } from '../../../../../sellers/domain/schemas/dto/response/seller.response';

export interface InvoiceResponse {
  idInvoice: number;
  seller: SellerResponse;
  cart: CartResponse;
  subtotal: number;
  iva: number;
  total: number;
  date: Date | string;
}
