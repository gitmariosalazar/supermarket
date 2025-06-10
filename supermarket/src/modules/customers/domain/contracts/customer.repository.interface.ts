import { CustomerResponse } from '../schemas/dto/response/customer.response';
import { CustomerModel } from '../schemas/model/customer.model';

export interface InterfaceCustomerRepository {
  findAllCustomers(): CustomerResponse[];
  findCustomerById(idCustomer: string): CustomerResponse | null;
  createCustomer(customerModel: CustomerModel): CustomerResponse | null;
  updateCustomer(
    idCustomer: string,
    customerModel: CustomerModel
  ): CustomerResponse | null;
}
