import { CartResponse } from '../schemas/dto/response/cart.response';
import { CartItemModel } from '../schemas/model/cart-items.model';
import { CartModel } from '../schemas/model/cart.model';

export interface InterfaceCartRepository {
  findAllCarts(): Promise<CartResponse[]>;
  findCartById(idCart: number): Promise<CartResponse | null>;
  findCartByIdCustomer(idCustomer: string): Promise<CartResponse[]>;
  createCart(cartModel: CartModel): Promise<CartResponse | null>;
  addProductToCart(
    cartItemModel: CartItemModel,
    cartModel: CartModel
  ): Promise<boolean>;
}
