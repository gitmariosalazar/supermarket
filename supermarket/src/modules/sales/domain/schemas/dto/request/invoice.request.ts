import { CartRequest } from '../../../../../carts/domain/schemas/dto/request/cart.request';
import { SellerRequest } from '../../../../../sellers/domain/schemas/dto/request/seller.request';

export class InvoiceRequest {
  public seller: SellerRequest;
  public cart: CartRequest;

  constructor(seller: SellerRequest, cart: CartRequest) {
    this.seller = seller;
    this.cart = cart;
  }
}
