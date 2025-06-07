import { PersonModel } from '../../../../shared/modules/person/domain/schemas/model/person.model';
import { PersonAdapter } from '../../../../shared/modules/person/infrastructure/adapters/person.adapter';
import { CustomerResponse } from '../../domain/schemas/dto/response/customer.response';
import { CustomerModel } from '../../domain/schemas/model/customer.model';

export class CustomerAdapter {
  static customerModelToCustomerResponse(
    customerModel: CustomerModel
  ): CustomerResponse {
    const customerResponse: CustomerResponse = {
      idCustomer: customerModel.getIdCustomer(),
      birthDate: customerModel.getBirthDate(),
      person: PersonAdapter.personModelToPersonResponse(
        new PersonModel(
          customerModel.getCardId(),
          customerModel.getFirstName(),
          customerModel.getLastName(),
          customerModel.getEmail(),
          customerModel.getAddress(),
          customerModel.getPhone()
        )
      )
    };
    return customerResponse;
  }
}
