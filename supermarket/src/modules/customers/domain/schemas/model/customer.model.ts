import { PersonModel } from '../../../../../shared/modules/person/domain/schemas/model/person.model';

export class CustomerModel extends PersonModel {
  private idCustomer: string;
  private birthDate: Date;

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

  public getIdCustomer(): string {
    return this.idCustomer;
  }

  public setIdCustomer(idCustomer: string): void {
    this.idCustomer = idCustomer;
  }

  public getBirthDate(): Date {
    return this.birthDate;
  }

  public setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }
}
