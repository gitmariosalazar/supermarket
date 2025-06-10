import { PersonRequest } from '../../../../../../shared/modules/person/domain/schemas/dto/request/person.request';

export class CustomerRequest extends PersonRequest {
  public idCustomer: string;
  public birthDate: Date;

  constructor(
    idCustomer: string,
    birthDate: Date,
    cardId: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string
  ) {
    super(cardId, firstName, lastName, email, address, phone);
    this.idCustomer = idCustomer;
    this.birthDate = birthDate;
  }
}
