import { CustomerResponse } from '../schemas/dto/response/customer.response';
import { CustomerModel } from '../schemas/model/customer.model';

export interface InterfaceCustomerRepository {
  findAllCustomers(): Promise<CustomerResponse[]>;
  findCustomerById(idCustomer: string): Promise<CustomerResponse | null>;
  createCustomer(
    customerModel: CustomerModel
  ): Promise<CustomerResponse | null>;
  updateCustomer(
    idCustomer: string,
    customerModel: CustomerModel
  ): Promise<CustomerResponse | null>;
}
