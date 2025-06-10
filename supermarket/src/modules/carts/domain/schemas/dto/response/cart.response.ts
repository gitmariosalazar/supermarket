import { CustomerResponse } from '../../../../../customers/domain/schemas/dto/response/customer.response';
import { CartItemResponse } from './cart-item.response';

export interface CartResponse {
  idCart?: number;
  customer: CustomerResponse;
  cartItems: CartItemResponse[];
  subtotal: number;
  iva: number;
  total: number;
}
