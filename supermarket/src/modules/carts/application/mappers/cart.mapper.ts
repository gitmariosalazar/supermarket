import { CustomerMapper } from '../../../customers/application/mappers/customer.mapper';
import { CustomerRequest } from '../../../customers/domain/schemas/dto/request/customer.request';
import { CartRequest } from '../../domain/schemas/dto/request/cart.request';
import { CartModel } from '../../domain/schemas/model/cart.model';

export class CartMapper {
  static cartRequestToCartModel(cartRequest: CartRequest): CartModel {
    const cartModel: CartModel = new CartModel(
      CustomerMapper.customerRequestToCustomerModel(
        new CustomerRequest(
          cartRequest.customer.idCustomer,
          cartRequest.customer.birthDate,
          cartRequest.customer.cardId,
          cartRequest.customer.firstName,
          cartRequest.customer.lastName,
          cartRequest.customer.email,
          cartRequest.customer.address,
          cartRequest.customer.phone
        )
      )
    );
    return cartModel;
  }
}
