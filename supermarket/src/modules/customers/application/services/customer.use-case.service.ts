import { CustomerMapper } from './../mappers/customer.mapper';
import { InterfaceCustomerRepository } from '../../domain/contracts/customer.repository.interface';
import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';
import { InterfaceUseCaseCustomer } from '../usecases/customer.use-case.interface';

export class CustomerService implements InterfaceUseCaseCustomer {
  constructor(
    private readonly customerRepository: InterfaceCustomerRepository
  ) {}

  findAllCustomers(): Promise<CustomerResponse[]> {
    return this.customerRepository.findAllCustomers();
  }

  findCustomerById(idCustomer: string): Promise<CustomerResponse | null> {
    return this.customerRepository.findCustomerById(idCustomer);
  }

  createCustomer(
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null> {
    return this.customerRepository.createCustomer(
      CustomerMapper.customerRequestToCustomerModel(customerRequest)
    );
  }

  updateCustomer(
    idCustomer: string,
    customerRequest: CustomerRequest
  ): Promise<CustomerResponse | null> {
    return this.customerRepository.updateCustomer(
      idCustomer,
      CustomerMapper.customerRequestToCustomerModel(customerRequest)
    );
  }
}
