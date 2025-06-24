import { ProductRequest } from '../../../../../products/domain/schemas/dto/request/product.request';
import { CartRequest } from './cart.request';

export class CartItemRequest {
  public idCartItem?: number;
  public cart: CartRequest;
  public product: ProductRequest;
  public quantity: number;
  public unitPrice?: number;
  public subtotal?: number;
  public iva?: number;
  public totalPrice?: number;

  constructor(
    cart: CartRequest,
    product: ProductRequest,
    quantity: number,
    unitPrice?: number,
    subtotal?: number,
    iva?: number,
    totalPrice?: number,
    idCartItem?: number
  ) {
    this.idCartItem = idCartItem ?? 0;
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = unitPrice ?? product.publicPrice;

    this.totalPrice = totalPrice ?? quantity * product.publicPrice!;
    this.subtotal = subtotal ?? this.totalPrice / 1.12;
    this.iva = iva ?? this.totalPrice - this.subtotal;
  }
}
