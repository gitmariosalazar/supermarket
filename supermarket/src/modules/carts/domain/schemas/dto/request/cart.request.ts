import { CustomerRequest } from '../../../../../customers/domain/schemas/dto/request/customer.request';
import { CartItemRequest } from './cart-item.request';

export class CartRequest {
  public idCart?: number;
  public customer: CustomerRequest;
  public cartItems: CartItemRequest[];

  constructor(
    customer: CustomerRequest,
    cartItems: CartItemRequest[],
    idCart?: number
  ) {
    this.customer = customer;
    this.cartItems = cartItems;
    this.idCart = idCart === undefined ? 0 : idCart;
  }
}
