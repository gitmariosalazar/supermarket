import { CartItemRequest } from './../../domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { CartModel } from '../../domain/schemas/model/cart.model';

export interface InterfaceCartUseCase {
  findAllCarts(): CartResponse[];
  findCartById(idCart: number): CartResponse | null;
  findCartByIdCustomer(idCustomer: string): CartResponse[];
  createCart(cartRequest: CartRequest): CartResponse | null;
  findCartByIdCustomerInQueue(idCustomer: string): CartModel | null;
  //addToCart(CartItemRequest: CartItemRequest): boolean;
}
