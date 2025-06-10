import { ProductRequest } from '../../../../../products/domain/schemas/dto/request/product.request';
import { CartRequest } from './cart.request';

export class CartItemRequest {
  public idCartItem?: number;
  public cart: CartRequest;
  public product: ProductRequest;
  public quantity: number;

  constructor(
    cart: CartRequest,
    product: ProductRequest,
    quantity: number,
    idCartItem?: number
  ) {
    this.idCartItem = idCartItem;
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
  }
}
