import { CartItemResponse } from '../schemas/dto/response/cart-item.response';
import { CartItemModel } from '../schemas/model/cart-items.model';

export interface InterfaceCartItemRepository {
  findAllCartItems(): Promise<CartItemResponse[]>;
  findCartItemById(idCartItem: number): Promise<CartItemResponse | null>;
  createCartItem(
    cartItemModel: CartItemModel
  ): Promise<CartItemResponse | null>;
  updateCartItem(
    idCartItem: number,
    cartItemModel: CartItemModel
  ): Promise<CartItemResponse | null>;
}
