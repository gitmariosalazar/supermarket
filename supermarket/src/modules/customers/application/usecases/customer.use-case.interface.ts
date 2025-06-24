import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';

export interface InterfaceUseCaseCustomer {
  findAllCustomers(): Promise<CustomerResponse[]>;
  findCustomerById(idCustomer: string): Promise<CustomerResponse | null>;
  createCustomer(
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null>;
  updateCustomer(
    idCustomer: string,
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null>;
}
