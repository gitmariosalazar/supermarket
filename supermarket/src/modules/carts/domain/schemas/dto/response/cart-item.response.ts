import { ProductResponse } from '../../../../../products/domain/schemas/dto/response/product.response';
import { CartResponse } from './cart.response';

export interface CartItemResponse {
  idCartItem?: number;
  cart: CartResponse;
  product: ProductResponse;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
