import { PersonModel } from '../../../../shared/modules/person/domain/schemas/model/person.model';
import { PersonAdapter } from '../../../../shared/modules/person/infrastructure/adapters/person.adapter';
import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../domain/schemas/dto/response/seller.response';
import { SellerModel } from '../../domain/schemas/model/seller.model';

export class SellerAdapter {
  static sellerModelToSellerResponse(sellerModel: SellerModel): SellerResponse {
    const sellerResponse: SellerResponse = {
      idSeller: sellerModel.getIdSeller(),
      hireDate: sellerModel.getHireDate(),
      salary: sellerModel.getSalary(),
      person: PersonAdapter.personModelToPersonResponse(
        new PersonModel(
          sellerModel.getCardId(),
          sellerModel.getFirstName(),
          sellerModel.getLastName(),
          sellerModel.getEmail(),
          sellerModel.getAddress(),
          sellerModel.getPhone()
        )
      )
    };
    return sellerResponse;
  }

  static sellerResponseToSellerRequest(
    sellerResponse: SellerResponse
  ): SellerRequest {
    const sellerRequest: SellerRequest = new SellerRequest(
      sellerResponse.idSeller,
      sellerResponse.hireDate,
      sellerResponse.salary,
      sellerResponse.person.cardId,
      sellerResponse.person.firstName,
      sellerResponse.person.lastName,
      sellerResponse.person.email,
      sellerResponse.person.address,
      sellerResponse.person.phone
    );
    return sellerRequest;
  }
}
