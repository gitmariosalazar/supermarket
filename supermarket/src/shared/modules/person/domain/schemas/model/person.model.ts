export class PersonModel {
  private cardId: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private address: string;
  private phone: string;

  constructor(
    cardId: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string
  ) {
    this.cardId = cardId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }

  public getCardId(): string {
    return this.cardId;
  }

  public setCardId(cardId: string): void {
    this.cardId = cardId;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }
}
