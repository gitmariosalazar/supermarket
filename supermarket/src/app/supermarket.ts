import { CartRequest } from '../modules/carts/domain/schemas/dto/request/cart.request';
import { CartResponse } from '../modules/carts/domain/schemas/dto/response/cart.response';
import { PriorityQueue } from '../shared/models/queue';
import { Company } from './company';

export class Supermarket {
  private idSupermarket: string;
  private name: string;
  private address: string;
  private email: string;
  private phone: string;
  private customersQueue: PriorityQueue<CartRequest>;

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
    this.customersQueue = new PriorityQueue();
  }

  public getCustomersQueue(): PriorityQueue<CartRequest> {
    return this.customersQueue;
  }

  public setCustomersQueue(customersQueue: PriorityQueue<CartRequest>): void {
    this.customersQueue = customersQueue;
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
