import { PersonResponse } from '../../domain/schemas/dto/response/person.response';
import { PersonModel } from '../../domain/schemas/model/person.model';

export class PersonAdapter {
  static personModelToPersonResponse(personModel: PersonModel): PersonResponse {
    const personResponse: PersonResponse = {
      cardId: personModel.getCardId(),
      firstName: personModel.getFirstName(),
      lastName: personModel.getLastName(),
      email: personModel.getEmail(),
      address: personModel.getAddress(),
      phone: personModel.getPhone()
    };
    return personResponse;
  }
}
