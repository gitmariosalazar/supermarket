import { CartService } from '../../application/services/cart.use-case.service';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { CartModel } from '../../domain/schemas/model/cart.model';

export class CartController {
  constructor(private readonly cartService: CartService) {}

  createCart(cartRequest: CartRequest): CartResponse | null {
    return this.cartService.createCart(cartRequest);
  }

  findAllCarts(): CartResponse[] {
    return this.cartService.findAllCarts();
  }

  findCartByCustomer(idCustomer: string): CartModel | null {
    return this.cartService.findCartByIdCustomerInQueue(idCustomer);
  }
}
