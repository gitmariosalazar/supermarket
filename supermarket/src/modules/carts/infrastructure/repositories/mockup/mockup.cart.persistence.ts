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
  async findAllCarts(): Promise<CartResponse[]> {
    return Array.from(this.databaseMockup.getCarts().getTable().values()).map(
      CartAdapter.cartModelToCartResponse
    );
  }

  async findCartById(idCart: number): Promise<CartResponse | null> {
    const findCart: CartModel | undefined = this.databaseMockup
      .getCarts()
      .find(idCart);
    return findCart !== undefined
      ? CartAdapter.cartModelToCartResponse(findCart)
      : null;
  }

  async createCart(cartModel: CartModel): Promise<CartResponse | null> {
    const keys = Array.from(this.databaseMockup.getCarts().getTable().keys());
    const maxId: number = keys.length > 0 ? Math.max(...keys) + 1 : 1;
    cartModel.setIdCart(maxId);
    const cartCreated: CartModel | undefined = this.databaseMockup
      .getCarts()
      .add(cartModel.getIdCart(), cartModel);
    cartModel
      .getCartItems()
      .getTable()
      .forEach((item) => {
        this.addProductToCart(item, cartModel);
        this.databaseMockup
          .getInventory()
          .update(item.getProduct().getCode(), item.getProduct());
      });
    return cartCreated !== undefined
      ? CartAdapter.cartModelToCartResponse(cartCreated)
      : null;
  }

  async findCartByIdCustomer(idCustomer: string): Promise<CartResponse[]> {
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

  async addProductToCart(
    cartItemModel: CartItemModel,
    cartModel: CartModel
  ): Promise<boolean> {
    const keys = Array.from(
      this.databaseMockup.getCartItems().getTable().keys()
    );
    const maxId: number = Math.max(...keys) + 1;
    cartItemModel.setCart(cartModel);
    cartItemModel.setIdCartItem(maxId);
    const cartItemCreated: CartItemModel | undefined = this.databaseMockup
      .getCartItems()
      .add(maxId, cartItemModel);
    return cartItemCreated !== undefined;
  }
}
