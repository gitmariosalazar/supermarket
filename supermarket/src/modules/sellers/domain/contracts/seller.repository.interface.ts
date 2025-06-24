import { SellerResponse } from '../schemas/dto/response/seller.response';
import { SellerModel } from '../schemas/model/seller.model';

export interface InterfaceSellerRepository {
  findAllSellers(): Promise<SellerResponse[]>;
  findSellerById(idSeller: string): Promise<SellerResponse | null>;
  createSeller(sellerModel: SellerModel): Promise<SellerResponse | null>;
  updateSeller(
    idSeller: string,
    sellerModel: SellerModel
  ): Promise<SellerResponse | null>;
}
