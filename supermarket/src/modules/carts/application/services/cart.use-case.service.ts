import { CartItemMapper } from './../mappers/cart-item.mapper';
import { CartMapper } from './../mappers/cart.mapper';
import { InterfaceCartRepository } from '../../domain/contracts/cart.repository.interface';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../domain/schemas/dto/response/cart.response';
import { InterfaceCartUseCase } from '../usecases/cart.use-case.interface';
import { CartItemRequest } from '../../domain/schemas/dto/request/cart-item.request';
import { CartModel } from '../../domain/schemas/model/cart.model';
import { CartItemModel } from '../../domain/schemas/model/cart-items.model';

export class CartService implements InterfaceCartUseCase {
  constructor(private readonly cartRepository: InterfaceCartRepository) {}

  findAllCarts(): Promise<CartResponse[]> {
    return this.cartRepository.findAllCarts();
  }

  findCartById(idCart: number): Promise<CartResponse | null> {
    return this.cartRepository.findCartById(idCart);
  }

  createCart(cartRequest: CartRequest): Promise<CartResponse | null> {
    return this.cartRepository.createCart(
      CartMapper.cartRequestToCartModel(cartRequest)
    );
  }

  addProductToCart(
    cartItemRequest: CartItemRequest,
    cartRequest: CartRequest
  ): Promise<boolean> {
    const cartItemModel: CartItemModel =
      CartItemMapper.cartItemRequestToCartItemModel(cartItemRequest);
    const cartModel: CartModel = CartMapper.cartRequestToCartModel(cartRequest);
    return this.cartRepository.addProductToCart(cartItemModel, cartModel);
  }

  addToCart(
    cartItemRequest: CartItemRequest,
    cartRequest: CartRequest
  ): string[] {
    let result: string[] = [
      'The product exceeds the stock quantity limit!',
      'error'
    ];
    const productStock: number = cartItemRequest.product.stock;
    const productCode = cartItemRequest.product.code;

    cartItemRequest.cart = cartRequest;
    const existingItemProduct = cartRequest.cartItems.find(productCode);

    const requestedQuantity = cartItemRequest.quantity;
    const totalRequested = existingItemProduct
      ? existingItemProduct.quantity + requestedQuantity
      : requestedQuantity;

    if (totalRequested > productStock) {
      const remaining = productStock - (existingItemProduct?.quantity ?? 0);
      result = [
        `You can only add ${remaining > 0 ? remaining : 0} more product(s)`,
        'warning'
      ];
      return remaining > 0
        ? result
        : ['The product exceeds the stock quantity limit!', 'error'];
    }

    if (existingItemProduct !== undefined) {
      existingItemProduct.quantity += requestedQuantity;
      existingItemProduct.subtotal =
        (existingItemProduct.quantity *
          existingItemProduct.product.publicPrice!) /
        ((100 + existingItemProduct.product.iva) / 100);
      existingItemProduct.totalPrice =
        existingItemProduct.quantity * existingItemProduct.product.publicPrice!;
      existingItemProduct.iva =
        existingItemProduct.totalPrice - existingItemProduct.subtotal;
      cartItemRequest = existingItemProduct;
      cartItemRequest.product.stock -= requestedQuantity;
      cartRequest.cartItems.update(productCode, cartItemRequest);
    } else {
      cartItemRequest.subtotal =
        (requestedQuantity * cartItemRequest.product.publicPrice!) /
        ((100 + cartItemRequest.product.iva) / 100);
      cartItemRequest.totalPrice =
        requestedQuantity * cartItemRequest.product.publicPrice!;
      cartItemRequest.iva =
        cartItemRequest.totalPrice - cartItemRequest.subtotal;
      cartItemRequest.product.stock -= requestedQuantity;
      cartRequest.cartItems.add(productCode, cartItemRequest);
    }
    this.updateTotalValues(cartRequest);
    return ['Product was added successfully', 'success'];
  }

  findCartByIdCustomer(idCustomer: string): Promise<CartResponse[]> {
    return this.cartRepository.findCartByIdCustomer(idCustomer);
  }

  private reduceStock(cartItemRequest: CartItemRequest): void {
    if (cartItemRequest.quantity <= cartItemRequest.product.stock) {
      cartItemRequest.product.stock -= cartItemRequest.quantity;
    } else {
      return;
    }
  }

  private updateTotalValues(cartRequest: CartRequest): void {
    cartRequest.subtotal = 0;
    cartRequest.total = 0;
    cartRequest.iva = 0;

    cartRequest.cartItems.getTable().forEach((cartItem) => {
      cartRequest.subtotal! += cartItem.subtotal ?? 0;
      cartRequest.total! += cartItem.totalPrice ?? 0;
      cartRequest.iva! += cartItem.iva ?? 0;
    });
  }
}
