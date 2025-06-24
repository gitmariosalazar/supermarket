import { CustomerAdapter } from '../../../customers/infrastructure/adapters/customer.adapter';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { CartModel } from '../../domain/schemas/model/cart.model';
import { CartItemAdapter } from './cart-item.adapter';

export class CartAdapter {
  static cartModelToCartResponse(cartModel: CartModel): CartResponse {
    const cartResponse: CartResponse = {
      idCart: cartModel.getIdCart(),
      customer: CustomerAdapter.customerModelToCustomerResponse(
        cartModel.getCustomer()
      ),
      cartItems: [],
      subtotal: cartModel.getSubtotal(),
      iva: cartModel.getIva(),
      total: cartModel.getTotal()
    };

    Array.from(cartModel.getCartItems().getTable().values()).forEach(
      (cartItem) => {
        const cartItemResponse: CartItemResponse =
          CartItemAdapter.cartItemModelToCartItemResponse(cartItem);
        cartItemResponse.cart = cartResponse;
        cartResponse.cartItems.push(cartItemResponse);
      }
    );

    return cartResponse;
  }

  static cartResponseToCartRequest(cartResponse: CartResponse): CartRequest {
    const cartItemRequest: CartItemRequest[] = Array.from(
      cartResponse.cartItems.map((cartItem) =>
        CartItemAdapter.cartItemResponseToCartItemRequest(cartItem)
      )
    );
    const cartRequest: CartRequest = new CartRequest(
      CustomerAdapter.customerResponseToCustomerRequest(cartResponse.customer)
    );
    return cartRequest;
  }
}
