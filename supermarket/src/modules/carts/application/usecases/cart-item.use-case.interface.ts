import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';

export interface InterfaceCartItemUseCase {
  findAllCartItems(): Promise<CartItemResponse[]>;
  findCartItemById(idCartItem: number): Promise<CartItemResponse | null>;
  createCartItem(
    cartItemRequest: CartItemRequest
  ): Promise<CartItemResponse | null>;
  updateCartItem(
    idCartItem: number,
    cartItemRequest: CartItemRequest
  ): Promise<CartItemResponse | null>;
}
