import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerModel } from '../../domain/schemas/model/customer.model';

export class CustomerMapper {
  static customerRequestToCustomerModel(
    customerRequest: CustomerRequest
  ): CustomerModel {
    const customerModel: CustomerModel = new CustomerModel(
      customerRequest.idCustomer,
      customerRequest.birthDate,
      customerRequest.cardId,
      customerRequest.firstName,
      customerRequest.lastName,
      customerRequest.email,
      customerRequest.address,
      customerRequest.phone
    );
    return customerModel;
  }
}
