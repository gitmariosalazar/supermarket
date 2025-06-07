import { HashMap } from '../../../../../shared/models/hash-map';
import { CustomerModel } from '../../../../customers/domain/schemas/model/customer.model';
import { ProductModel } from '../../../../products/domain/schemas/model/product.model';
import { CartItemModel } from './cart-items.model';

export class CartModel {
  private idCart?: number;
  private customer: CustomerModel;
  private cartItems: HashMap<string, CartItemModel>;
  private subtotal: number;
  private iva: number;
  private total: number;

  constructor(
    customer: CustomerModel,
    subtotal?: number,
    iva?: number,
    total?: number,
    idCart?: number
  ) {
    this.customer = customer;
    this.cartItems = new HashMap();
    this.subtotal = subtotal === undefined ? 0 : subtotal;
    this.iva = iva === undefined ? 0 : iva;
    this.total = total === undefined ? 0 : total;
    this.idCart = idCart === undefined ? 0 : idCart;
  }

  addToCart(cartItemModel: CartItemModel): void {
    cartItemModel.setUnitPrice(cartItemModel.getProduct().getPublicPrice());
    cartItemModel.setTotalPrice(
      cartItemModel.getQuantity() * cartItemModel.getProduct().getPublicPrice()
    );
    if (!this.cartItems.has(cartItemModel.getProduct().getCode())) {
      this.cartItems.add(cartItemModel.getProduct().getCode(), cartItemModel);
    } else {
      this.cartItems.update(
        cartItemModel.getProduct().getCode(),
        cartItemModel
      );
    }
    this.updateTotalValues();
  }

  private updateTotalValues(): void {
    this.cartItems.getTable().forEach((cartItem, key) => {
      this.subtotal += cartItem.getTotalPrice();
    });
    this.total += this.subtotal * 1.12;
    this.iva = this.total - this.subtotal;
  }

  public getIdCart(): number {
    return this.idCart === undefined ? 0 : this.idCart;
  }

  public setIdCart(idCart: number): void {
    this.idCart = idCart;
  }

  public getCustomer(): CustomerModel {
    return this.customer;
  }

  public setCustomer(customer: CustomerModel): void {
    this.customer = customer;
  }

  public getCartItems(): HashMap<string, CartItemModel> {
    return this.cartItems;
  }

  public setCartItems(cartItems: HashMap<string, CartItemModel>): void {
    this.cartItems = cartItems;
  }

  public getSubtotal(): number {
    return this.subtotal;
  }

  public setSubtotal(subtotal: number): void {
    this.subtotal = subtotal;
  }

  public getIva(): number {
    return this.iva;
  }

  public setIva(iva: number): void {
    this.iva = iva;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }
}
