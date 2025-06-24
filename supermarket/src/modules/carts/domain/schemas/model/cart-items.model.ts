import { ProductModel } from '../../../../products/domain/schemas/model/product.model';
import { CartModel } from './cart.model';

export class CartItemModel {
  private idCartItem?: number;
  private cart: CartModel;
  private product: ProductModel;
  private quantity: number;
  private unitPrice?: number;
  private subtotal?: number;

  private iva?: number;
  private totalPrice?: number;

  constructor(
    cart: CartModel | null,
    product: ProductModel,
    quantity: number,
    unitPrice?: number,
    subtotal?: number,
    iva?: number,
    totalPrice?: number,
    idCartItem?: number
  ) {
    this.idCartItem = idCartItem;
    this.cart = cart!;
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = unitPrice !== undefined ? unitPrice : 0;
    this.subtotal = subtotal !== undefined ? subtotal : 0;
    this.totalPrice = totalPrice !== undefined ? totalPrice : 0;
    this.iva = iva !== undefined ? iva : 0;
  }

  public getSubtotal(): number {
    return this.subtotal!;
  }

  public setSubtotal?(subtotal: number): void {
    this.subtotal = subtotal;
  }

  public getIva(): number {
    return this.iva!;
  }

  public setIva(iva: number): void {
    this.iva = iva;
  }

  public getIdCartItem(): number {
    return this.idCartItem !== undefined ? this.idCartItem : 0;
  }

  public setIdCartItem(idCartItem: number): void {
    this.idCartItem = idCartItem;
  }

  public getCart(): CartModel {
    return this.cart;
  }

  public setCart(cart: CartModel): void {
    this.cart = cart;
  }

  public getProduct(): ProductModel {
    return this.product;
  }

  public setProduct(product: ProductModel): void {
    this.product = product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getUnitPrice(): number {
    return this.unitPrice!;
  }

  public setUnitPrice(unitPrice: number): void {
    this.unitPrice = unitPrice;
  }

  public getTotalPrice(): number {
    return this.totalPrice!;
  }

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }
}
