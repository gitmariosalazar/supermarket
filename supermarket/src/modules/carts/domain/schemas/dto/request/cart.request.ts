import { HashMap } from '../../../../../../shared/models/hash-map';
import { CustomerRequest } from '../../../../../customers/domain/schemas/dto/request/customer.request';
import { CartItemRequest } from './cart-item.request';

export class CartRequest {
  public idCart?: number;
  public customer: CustomerRequest;
  public cartItems: HashMap<string, CartItemRequest>;
  public subtotal?: number;
  public iva?: number;
  public total?: number;

  constructor(
    customer: CustomerRequest,
    cartItems: CartItemRequest[],
    idCart?: number
  ) {
    this.customer = customer;
    this.cartItems = new HashMap();
    this.idCart = idCart === undefined ? 0 : idCart;
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  addToCart(cartItemRequest: CartItemRequest): void {
    if (this.cartItems.has(cartItemRequest.product.code)) {
      this.cartItems.update(cartItemRequest.product.code, cartItemRequest);
    } else {
      this.cartItems.add(cartItemRequest.product.code, cartItemRequest);
    }
  }
}
