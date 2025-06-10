import { PersonResponse } from '../../../../../../shared/modules/person/domain/schemas/dto/response/person.response';

export interface SellerResponse {
  idSeller: string;
  hireDate: Date;
  salary: number;
  person: PersonResponse;
}
