import { CustomerAdapter } from '../../../customers/infrastructure/adapters/customer.adapter';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { CartModel } from '../../domain/schemas/model/cart.model';
import { CartItemAdapter } from './cart-item.adapter';

export class CartAdapter {
  static cartModelToCartResponse(cartModel: CartModel): CartResponse {
    const cartItemsResponse: CartItemResponse[] = Array.from(
      cartModel.getCartItems().getTable().values()
    ).map((cartItem) =>
      CartItemAdapter.cartItemModelToCartItemResponse(cartItem)
    );

    const cartResponse: CartResponse = {
      idCart: cartModel.getIdCart(),
      customer: CustomerAdapter.customerModelToCustomerResponse(
        cartModel.getCustomer()
      ),
      cartItems: cartItemsResponse,
      subtotal: cartModel.getSubtotal(),
      iva: cartModel.getIva(),
      total: cartModel.getTotal()
    };
    return cartResponse;
  }
}
