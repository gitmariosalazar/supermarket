import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceCartItemRepository } from '../../../domain/contracts/cart-items.repository.interface';
import { CartItemResponse } from '../../../domain/schemas/dto/response/cart-item.response';
import { CartItemModel } from '../../../domain/schemas/model/cart-items.model';
import { CartItemAdapter } from '../../adapters/cart-item.adapter';

export class CartItemRepositoryMockupImplementation
  implements InterfaceCartItemRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  findAllCartItems(): CartItemResponse[] {
    return Array.from(
      this.databaseMockup.getCartItems().getTable().values()
    ).map(CartItemAdapter.cartItemModelToCartItemResponse);
  }

  findCartItemById(idCartItem: number): CartItemResponse | null {
    const cartItem: CartItemModel | undefined = this.databaseMockup
      .getCartItems()
      .find(idCartItem);
    return cartItem !== undefined
      ? CartItemAdapter.cartItemModelToCartItemResponse(cartItem)
      : null;
  }

  createCartItem(cartItemModel: CartItemModel): CartItemResponse | null {
    const cartItemCreated: CartItemModel | undefined = this.databaseMockup
      .getCartItems()
      .add(cartItemModel.getIdCartItem(), cartItemModel);
    return cartItemCreated !== undefined
      ? CartItemAdapter.cartItemModelToCartItemResponse(cartItemCreated)
      : null;
  }

  updateCartItem(
    idCartItem: number,
    cartItemModel: CartItemModel
  ): CartItemResponse | null {
    const cartItemUpdated: CartItemModel | undefined = this.databaseMockup
      .getCartItems()
      .update(idCartItem, cartItemModel);
    return cartItemUpdated !== undefined
      ? CartItemAdapter.cartItemModelToCartItemResponse(cartItemUpdated)
      : null;
  }
}
