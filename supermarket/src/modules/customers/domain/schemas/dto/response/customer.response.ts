import { PersonResponse } from '../../../../../../shared/modules/person/domain/schemas/dto/response/person.response';

export interface CustomerResponse {
  idCustomer: string;
  birthDate: Date;
  person: PersonResponse;
}
