export class PersonRequest {
  cardId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;

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
}
