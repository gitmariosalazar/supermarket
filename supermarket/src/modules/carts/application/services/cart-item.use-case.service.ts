import { CartItemMapper } from './../mappers/cart-item.mapper';
import { InterfaceCartItemRepository } from '../../domain/contracts/cart-items.repository.interface';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';
import { InterfaceCartItemUseCase } from '../usecases/cart-item.use-case.interface';

export class CartItemService implements InterfaceCartItemUseCase {
  constructor(
    private readonly cartItemRepository: InterfaceCartItemRepository
  ) {}
  findAllCartItems(): Promise<CartItemResponse[]> {
    return this.cartItemRepository.findAllCartItems();
  }

  findCartItemById(idCartItem: number): Promise<CartItemResponse | null> {
    return this.cartItemRepository.findCartItemById(idCartItem);
  }

  createCartItem(
    cartItemRequest: CartItemRequest
  ): Promise<CartItemResponse | null> {
    return this.cartItemRepository.createCartItem(
      CartItemMapper.cartItemRequestToCartItemModel(cartItemRequest)
    );
  }

  updateCartItem(
    idCartItem: number,
    cartItemRequest: CartItemRequest
  ): Promise<CartItemResponse | null> {
    return this.cartItemRepository.updateCartItem(
      idCartItem,
      CartItemMapper.cartItemRequestToCartItemModel(cartItemRequest)
    );
  }
}
