import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerModel } from '../../domain/schemas/model/seller.model';

export class SellerMapper {
  static sellerRequestToSellerModel(sellerRequest: SellerRequest): SellerModel {
    const sellerModel: SellerModel = new SellerModel(
      sellerRequest.idSeller,
      sellerRequest.hireDate,
      sellerRequest.salary,
      sellerRequest.cardId,
      sellerRequest.firstName,
      sellerRequest.lastName,
      sellerRequest.email,
      sellerRequest.address,
      sellerRequest.phone
    );
    return sellerModel;
  }
}
