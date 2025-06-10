import { PersonRequest } from '../../domain/schemas/dto/request/person.request';
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

  static personResponseToPersonRequest(
    personResponse: PersonResponse
  ): PersonRequest {
    const personRequest: PersonRequest = new PersonRequest(
      personResponse.cardId,
      personResponse.firstName,
      personResponse.lastName,
      personResponse.email,
      personResponse.address,
      personResponse.phone
    );
    return personRequest;
  }
}
