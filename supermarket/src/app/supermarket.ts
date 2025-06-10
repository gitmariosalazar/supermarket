import { Company } from './company';

export class Supermarket {
  private idSupermarket: string;
  private name: string;
  private address: string;
  private email: string;
  private phone: string;

  constructor(
    idSupermarket: string,
    name: string,
    address: string,
    email: string,
    phone: string
  ) {
    this.idSupermarket = idSupermarket;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  public getIdSupermarket(): string {
    return this.idSupermarket;
  }

  public setIdSupermarket(idSupermarket: string): void {
    this.idSupermarket = idSupermarket;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }
}
