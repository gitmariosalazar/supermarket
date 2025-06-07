import { PersonModel } from '../../../../../shared/modules/person/domain/schemas/model/person.model';

export class SellerModel extends PersonModel {
  private idSeller: string;
  private hireDate: Date;
  private salary: number;

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
  public getIdSeller(): string {
    return this.idSeller;
  }

  public setIdSeller(idSeller: string): void {
    this.idSeller = idSeller;
  }

  public getHireDate(): Date {
    return this.hireDate;
  }

  public setHireDate(hireDate: Date): void {
    this.hireDate = hireDate;
  }

  public getSalary(): number {
    return this.salary;
  }

  public setSalary(salary: number): void {
    this.salary = salary;
  }
}
