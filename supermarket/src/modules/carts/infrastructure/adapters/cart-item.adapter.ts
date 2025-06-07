import { ProductAdapter } from '../../../products/infrastructure/adapters/product.adapter';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';
import { CartItemModel } from '../../domain/schemas/model/cart-items.model';
import { CartAdapter } from './cart.adapter';

export class CartItemAdapter {
  static cartItemModelToCartItemResponse(
    cartItemModel: CartItemModel
  ): CartItemResponse {
    const cartItemResponse: CartItemResponse = {
      idCartItem: cartItemModel.getIdCartItem(),
      cart: CartAdapter.cartModelToCartResponse(cartItemModel.getCart()),
      product: ProductAdapter.productModelToProductResponse(
        cartItemModel.getProduct()
      ),
      quantity: cartItemModel.getQuantity(),
      unitPrice: cartItemModel.getUnitPrice(),
      totalPrice: cartItemModel.getTotalPrice()
    };
    return cartItemResponse;
  }
}
