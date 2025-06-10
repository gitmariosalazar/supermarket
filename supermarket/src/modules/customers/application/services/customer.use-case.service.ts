import { CustomerMapper } from './../mappers/customer.mapper';
import { InterfaceCustomerRepository } from '../../domain/contracts/customer.repository.interface';
import { CustomerRequest } from '../../domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';
import { InterfaceUseCaseCustomer } from '../usecases/customer.use-case.interface';

export class CustomerService implements InterfaceUseCaseCustomer {
  constructor(
    private readonly customerRepository: InterfaceCustomerRepository
  ) {}

  findAllCustomers(): CustomerResponse[] {
    return this.customerRepository.findAllCustomers();
  }

  findCustomerById(idCustomer: string): CustomerResponse | null {
    return this.customerRepository.findCustomerById(idCustomer);
  }

  createCustomer(customerRequest: CustomerRequest): CustomerResponse | null {
    return this.customerRepository.createCustomer(
      CustomerMapper.customerRequestToCustomerModel(customerRequest)
    );
  }

  updateCustomer(
    idCustomer: string,
    customerRequest: CustomerRequest
  ): CustomerResponse | null {
    return this.customerRepository.updateCustomer(
      idCustomer,
      CustomerMapper.customerRequestToCustomerModel(customerRequest)
    );
  }
}
