import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';

export interface InterfaceCartItemUseCase {
  findAllCartItems(): CartItemResponse[];
  findCartItemById(idCartItem: number): CartItemResponse | null;
  createCartItem(cartItemRequest: CartItemRequest): CartItemResponse | null;
  updateCartItem(
    idCartItem: number,
    cartItemRequest: CartItemRequest
  ): CartItemResponse | null;
}
