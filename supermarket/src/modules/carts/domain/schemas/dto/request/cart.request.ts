import { HashMap } from '../../../../../../shared/models/hash-map';
import { ShowMessage } from '../../../../../../ui/messages/message.util';
import { CustomerRequest } from '../../../../../customers/domain/schemas/dto/request/customer.request';
import { CartItemRequest } from './cart-item.request';

export class CartRequest {
  public idCart?: number;
  public customer: CustomerRequest;
  public cartItems: HashMap<string, CartItemRequest>;
  public subtotal?: number;
  public iva?: number;
  public total?: number;

  constructor(customer: CustomerRequest, idCart?: number) {
    this.customer = customer;
    this.cartItems = new HashMap();
    this.idCart = idCart ?? 0;
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }
  /*
  public addToCart(cartItemRequest: CartItemRequest): void {
    cartItemRequest.cart = this;

    const existingItem = this.cartItems.find(cartItemRequest.product.code);
    if (existingItem) {
      existingItem.quantity += cartItemRequest.quantity;
      existingItem.subtotal =
        (existingItem.quantity * existingItem.product.publicPrice!) / 1.12;
      existingItem.totalPrice =
        existingItem.quantity * existingItem.product.publicPrice!;
      existingItem.iva = existingItem.totalPrice - existingItem.subtotal;
      this.cartItems.update(existingItem.product.code, existingItem);
      try {
        this.reduceStock(existingItem);
      } catch (error) {
        console.log('❌ No se pudo reducir el stock:', error);
        return;
      }
    } else {
      cartItemRequest.subtotal =
        (cartItemRequest.quantity * cartItemRequest.product.publicPrice!) /
        1.12;
      cartItemRequest.totalPrice =
        cartItemRequest.quantity * cartItemRequest.product.publicPrice!;
      cartItemRequest.iva =
        cartItemRequest.totalPrice - cartItemRequest.subtotal;
      this.cartItems.add(cartItemRequest.product.code, cartItemRequest);
      try {
        this.reduceStock(cartItemRequest);
      } catch (error) {
        console.log('❌ No se pudo reducir el stock:', error);
        return;
      }
    }

    this.updateTotalValues();
  }

  private reduceStock(cartItemRequest: CartItemRequest): void {
    if (cartItemRequest.quantity <= cartItemRequest.product.stock) {
      cartItemRequest.product.stock -= cartItemRequest.quantity;
    } else {
      throw new Error('Error, the quantity ');
    }
  }

  private updateTotalValues(): void {
    this.subtotal = 0;
    this.total = 0;

    this.cartItems.getTable().forEach((cartItem) => {
      this.subtotal! += cartItem.subtotal ?? 0;
    });

    this.total = this.subtotal * 1.12;
    this.iva = this.total - this.subtotal;
  }
  */
}
