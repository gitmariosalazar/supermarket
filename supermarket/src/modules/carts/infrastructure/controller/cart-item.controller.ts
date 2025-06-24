import { CartItemService } from '../../application/services/cart-item.use-case.service';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartItemResponse } from '../../domain/schemas/dto/response/cart-item.response';

export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  createCartItem(
    cartItemRequest: CartItemRequest
  ): Promise<CartItemResponse | null> {
    return this.cartItemService.createCartItem(cartItemRequest);
  }
}
