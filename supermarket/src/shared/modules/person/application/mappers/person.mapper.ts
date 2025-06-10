import { PersonRequest } from '../../domain/schemas/dto/request/person.request';
import { PersonModel } from '../../domain/schemas/model/person.model';

export class PersonMapper {
  static personRequestToPersonModel(personRequest: PersonRequest): PersonModel {
    const personModel: PersonModel = new PersonModel(
      personRequest.cardId,
      personRequest.firstName,
      personRequest.lastName,
      personRequest.email,
      personRequest.address,
      personRequest.phone
    );
    return personModel;
  }
}
