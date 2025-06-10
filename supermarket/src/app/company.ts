import { HashMap } from '../shared/models/hash-map';
import { Supermarket } from './supermarket';

export class Company {
  private ruc: string;
  private name: string;
  private address: string;
  private email: string;
  private phone: string;
  private supermarkets: HashMap<string, Supermarket>;

  constructor(
    ruc: string,
    name: string,
    address: string,
    email: string,
    phone: string
  ) {
    this.ruc = ruc;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.supermarkets = new HashMap<string, Supermarket>();
  }

  addSupermarket(supermarket: Supermarket): boolean {
    return (
      this.supermarkets.add(supermarket.getIdSupermarket(), supermarket) !==
      undefined
    );
  }

  public getRuc(): string {
    return this.ruc;
  }

  public setRuc(ruc: string): void {
    this.ruc = ruc;
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

  public getSupermarkets(): HashMap<string, Supermarket> {
    return this.supermarkets;
  }
}
