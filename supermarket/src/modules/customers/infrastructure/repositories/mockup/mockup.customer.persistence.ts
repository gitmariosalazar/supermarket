import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceCustomerRepository } from '../../../domain/contracts/customer.repository.interface';
import { CustomerResponse } from '../../../domain/schemas/dto/response/customer.response';
import { CustomerModel } from '../../../domain/schemas/model/customer.model';
import { CustomerAdapter } from '../../adapters/customer.adapter';

export class CustomerRepositoryMockupImplementation
  implements InterfaceCustomerRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  async findAllCustomers(): Promise<CustomerResponse[]> {
    return Array.from(
      this.databaseMockup.getCustomers().getTable().values()
    ).map(CustomerAdapter.customerModelToCustomerResponse);
  }

  async findCustomerById(idCustomer: string): Promise<CustomerResponse | null> {
    const customerFound: CustomerModel | undefined = this.databaseMockup
      .getCustomers()
      .find(idCustomer);
    return customerFound !== undefined
      ? CustomerAdapter.customerModelToCustomerResponse(customerFound)
      : null;
  }

  async createCustomer(
    customerModel: CustomerModel
  ): Promise<CustomerResponse | null> {
    const customerCreated: CustomerModel | undefined = this.databaseMockup
      .getCustomers()
      .add(customerModel.getIdCustomer(), customerModel);
    return customerCreated !== undefined
      ? CustomerAdapter.customerModelToCustomerResponse(customerCreated)
      : null;
  }

  async updateCustomer(
    idCustomer: string,
    customerModel: CustomerModel
  ): Promise<CustomerResponse | null> {
    const customerUpdated: CustomerModel | undefined = this.databaseMockup
      .getCustomers()
      .update(idCustomer, customerModel);
    return customerUpdated !== undefined
      ? CustomerAdapter.customerModelToCustomerResponse(customerUpdated)
      : null;
  }
}
