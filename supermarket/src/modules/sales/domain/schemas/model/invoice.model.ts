import { CartModel } from '../../../../carts/domain/schemas/model/cart.model';
import { SellerModel } from '../../../../sellers/domain/schemas/model/seller.model';

export class InvoiceModel {
  private idInvoice: number;
  private seller: SellerModel;
  private cart: CartModel;
  private subtotal: number;
  private iva: number;
  private total: number;

  constructor(seller: SellerModel, cart: CartModel) {
    this.idInvoice = 0;
    this.seller = seller;
    this.cart = cart;
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  public getIdInvoice(): number {
    return this.idInvoice;
  }

  public setIdInvoice(idInvoice: number): void {
    this.idInvoice = idInvoice;
  }

  public getSalesman(): SellerModel {
    return this.seller;
  }

  public setSalesman(seller: SellerModel): void {
    this.seller = seller;
  }

  public getCart(): CartModel {
    return this.cart;
  }

  public setCart(cart: CartModel): void {
    this.cart = cart;
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
