import { CartService } from '../../application/services/cart.use-case.service';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';

export class CartController {
  constructor(private readonly cartService: CartService) {}

  createCart(cartRequest: CartRequest): Promise<CartResponse | null> {
    return this.cartService.createCart(cartRequest);
  }

  findAllCarts(): Promise<CartResponse[]> {
    return this.cartService.findAllCarts();
  }

  findCartByCustomer(idCustomer: string): Promise<CartResponse[]> {
    return this.cartService.findCartByIdCustomer(idCustomer);
  }

  findCartById(id: number): Promise<CartResponse | null> {
    return this.cartService.findCartById(id);
  }

  addToCart(
    cartItemRequest: CartItemRequest,
    cartRequest: CartRequest
  ): string[] {
    return this.cartService.addToCart(cartItemRequest, cartRequest);
  }
}
