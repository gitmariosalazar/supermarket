import { SellerResponse } from '../schemas/dto/response/seller.response';
import { SellerModel } from '../schemas/model/seller.model';

export interface InterfaceSellerRepository {
  findAllSellers(): SellerResponse[];
  findSellerById(idSeller: string): SellerResponse | null;
  createSeller(sellerModel: SellerModel): SellerResponse | null;
  updateSeller(
    idSeller: string,
    sellerModel: SellerModel
  ): SellerResponse | null;
}
