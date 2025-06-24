import { CustomerService } from '../../application/services/customer.use-case.service';
import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  findAllCustomers(): Promise<CustomerResponse[]> {
    return this.customerService.findAllCustomers();
  }

  findCustomerById(idCustomer: string): Promise<CustomerResponse | null> {
    return this.customerService.findCustomerById(idCustomer);
  }

  createCustomer(
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null> {
    return this.customerService.createCustomer(customerRequest);
  }

  updateCustomer(
    idCustomer: string,
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null> {
    return this.customerService.updateCustomer(idCustomer, customerRequest);
  }
}
