import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';

export interface InterfaceUseCaseCustomer {
  findAllCustomers(): CustomerResponse[];
  findCustomerById(idCustomer: string): CustomerResponse | null;
  createCustomer(customerRequest: CustomerRequest): CustomerResponse | null;
  updateCustomer(
    idCustomer: string,
    customerRequest: CustomerRequest
  ): CustomerResponse | null;
}
