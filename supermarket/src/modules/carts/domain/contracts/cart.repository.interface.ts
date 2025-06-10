import { CartResponse } from '../schemas/dto/response/cart.response';
import { CartItemModel } from '../schemas/model/cart-items.model';
import { CartModel } from '../schemas/model/cart.model';

export interface InterfaceCartRepository {
  findAllCarts(): CartResponse[];
  findCartById(idCart: number): CartResponse | null;
  findCartByIdCustomer(idCustomer: string): CartResponse[];
  findCartByIdCustomerInQueue(idCustomer: string): CartModel | null;
  createCart(cartModel: CartModel): CartResponse | null;
  //addToCart(cartItemModel: CartItemModel): boolean;
}
