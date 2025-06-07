import { CartItemMapper } from './../mappers/cart-item.mapper';
import { CartMapper } from './../mappers/cart.mapper';
import { InterfaceCartRepository } from '../../domain/contracts/cart.repository.interface';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { InterfaceCartUseCase } from '../usecases/cart.use-case.interface';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartModel } from '../../domain/schemas/model/cart.model';

export class CartService implements InterfaceCartUseCase {
  constructor(private readonly cartRepository: InterfaceCartRepository) {}

  findAllCarts(): CartResponse[] {
    return this.cartRepository.findAllCarts();
  }

  findCartById(idCart: number): CartResponse | null {
    return this.cartRepository.findCartById(idCart);
  }

  createCart(cartRequest: CartRequest): CartResponse | null {
    return this.cartRepository.createCart(
      CartMapper.cartRequestToCartModel(cartRequest)
    );
  }
  /*
  addToCart(cartItemRequest: CartItemRequest): boolean {
    return this.cartRepository.addToCart(
      CartItemMapper.cartItemRequestToCartItemModel(cartItemRequest)
    );
  }
*/
  findCartByIdCustomer(idCustomer: string): CartResponse[] {
    return this.cartRepository.findCartByIdCustomer(idCustomer);
  }

  findCartByIdCustomerInQueue(idCustomer: string): CartModel | null {
    return this.cartRepository.findCartByIdCustomerInQueue(idCustomer);
  }
}
