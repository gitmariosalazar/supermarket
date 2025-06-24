import { ProductMapper } from '../../../products/application/mappers/product.mapper';
import { ProductRequest } from '../../../products/domain/schemas/dto/request/product.request';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartItemModel } from '../../domain/schemas/model/cart-items.model';
import { CartMapper } from './cart.mapper';

export class CartItemMapper {
  static cartItemRequestToCartItemModel(
    cartItemRequest: CartItemRequest
  ): CartItemModel {
    const productRequest: ProductRequest = cartItemRequest.product;
    const cartRequest: CartRequest = cartItemRequest.cart;

    const cartItemModel: CartItemModel = new CartItemModel(
      null, //CartMapper.cartRequestToCartModel(cartRequest)
      ProductMapper.productRequestToProductModel(productRequest),
      cartItemRequest.quantity,
      cartItemRequest.unitPrice!,
      cartItemRequest.subtotal!,
      cartItemRequest.iva!,
      cartItemRequest.totalPrice!,
      cartItemRequest.idCartItem
    );
    return cartItemModel;
  }
}
