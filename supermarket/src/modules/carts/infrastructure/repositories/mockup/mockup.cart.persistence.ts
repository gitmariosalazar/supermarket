import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceCartRepository } from '../../../domain/contracts/cart.repository.interface';
import { CartResponse } from '../../../domain/schemas/dto/response/cart.response';
import { CartItemModel } from '../../../domain/schemas/model/cart-items.model';
import { CartModel } from '../../../domain/schemas/model/cart.model';
import { CartAdapter } from '../../adapters/cart.adapter';

export class CartRepositoryMockupImplementation
  implements InterfaceCartRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}
  findAllCarts(): CartResponse[] {
    return Array.from(this.databaseMockup.getCarts().getTable().values()).map(
      CartAdapter.cartModelToCartResponse
    );
  }

  findCartById(idCart: number): CartResponse | null {
    const findCart: CartModel | undefined = this.databaseMockup
      .getCarts()
      .find(idCart);
    return findCart !== undefined
      ? CartAdapter.cartModelToCartResponse(findCart)
      : null;
  }

  createCart(cartModel: CartModel): CartResponse | null {
    const id: number = this.databaseMockup.getCarts().size() + 1;
    cartModel.setIdCart(id);
    const cartCreated: CartModel | undefined = this.databaseMockup
      .getCarts()
      .add(cartModel.getIdCart(), cartModel);
    return cartCreated !== undefined
      ? CartAdapter.cartModelToCartResponse(cartCreated)
      : null;
  }

  findCartByIdCustomer(idCustomer: string): CartResponse[] {
    const carts: CartModel[] = Array.from(
      this.databaseMockup.getCarts().getTable().values()
    );
    const result: CartResponse[] = [];
    for (const cart of carts) {
      if (cart.getCustomer().getIdCustomer() === idCustomer) {
        result.push(CartAdapter.cartModelToCartResponse(cart));
      }
    }
    return result;
  }

  findCartByIdCustomerInQueue(idCustomer: string): CartModel | null {
    const carts: CartModel[] = Array.from(
      this.databaseMockup.getCarts().getTable().values()
    );
    for (const cart of carts) {
      if (cart.getCustomer().getIdCustomer() === idCustomer) {
        return cart;
      }
    }
    return null;
  }
}
