import { ProductResponse } from '../../../../../products/domain/schemas/dto/response/product.response';
import { CartResponse } from './cart.response';

export interface CartItemResponse {
  idCartItem?: number;
  cart: CartResponse | null;
  product: ProductResponse;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  iva: number;
  totalPrice: number;
}
