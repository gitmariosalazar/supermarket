import { PersonRequest } from '../../../../../../shared/modules/person/domain/schemas/dto/request/person.request';

export class SellerRequest extends PersonRequest {
  public idSeller: string;
  public hireDate: Date;
  public salary: number;

  constructor(
    idSeller: string,
    hireDate: Date,
    salary: number,
    cardId: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string
  ) {
    super(cardId, firstName, lastName, email, address, phone);
    this.idSeller = idSeller;
    this.hireDate = hireDate;
    this.salary = salary;
  }
}
