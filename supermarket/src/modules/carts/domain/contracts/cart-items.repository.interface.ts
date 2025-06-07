import { CartItemResponse } from '../schemas/dto/response/cart-item.response';
import { CartItemModel } from '../schemas/model/cart-items.model';

export interface InterfaceCartItemRepository {
  findAllCartItems(): CartItemResponse[];
  findCartItemById(idCartItem: number): CartItemResponse | null;
  createCartItem(cartItemModel: CartItemModel): CartItemResponse | null;
  updateCartItem(
    idCartItem: number,
    cartItemModel: CartItemModel
  ): CartItemResponse | null;
}
