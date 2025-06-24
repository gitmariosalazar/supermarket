import { CartItemRequest } from './../../domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { CartModel } from '../../domain/schemas/model/cart.model';

export interface InterfaceCartUseCase {
  findAllCarts(): Promise<CartResponse[]>;
  findCartById(idCart: number): Promise<CartResponse | null>;
  findCartByIdCustomer(idCustomer: string): Promise<CartResponse[]>;
  createCart(cartRequest: CartRequest): Promise<CartResponse | null>;
  addProductToCart(
    cartItemRequest: CartItemRequest,
    cartRequest: CartRequest
  ): Promise<boolean>;
}
