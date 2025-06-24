import { ProductAdapter } from '../../../products/infrastructure/adapters/product.adapter';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';
import { CartItemModel } from '../../domain/schemas/model/cart-items.model';
import { CartAdapter } from './cart.adapter';

export class CartItemAdapter {
  static cartItemModelToCartItemResponse(
    cartItemModel: CartItemModel
  ): CartItemResponse {
    const cartItemResponse: CartItemResponse = {
      idCartItem: cartItemModel.getIdCartItem(),
      cart: null,
      product: ProductAdapter.productModelToProductResponse(
        cartItemModel.getProduct()
      ),
      quantity: cartItemModel.getQuantity(),
      unitPrice: cartItemModel.getUnitPrice(),
      subtotal: cartItemModel.getSubtotal()!,
      iva: cartItemModel.getIva(),
      totalPrice: cartItemModel.getTotalPrice()
    };
    return cartItemResponse;
  }

  static cartItemResponseToCartItemRequest(
    cartItemResponse: CartItemResponse
  ): CartItemRequest {
    const cartItemRequest: CartItemRequest = new CartItemRequest(
      CartAdapter.cartResponseToCartRequest(cartItemResponse.cart!),
      ProductAdapter.productResponseToProductRequest(cartItemResponse.product),
      cartItemResponse.quantity,
      cartItemResponse.unitPrice,
      cartItemResponse.subtotal,
      cartItemResponse.iva,
      cartItemResponse.totalPrice,
      cartItemResponse.idCartItem
    );
    return cartItemRequest;
  }
}
