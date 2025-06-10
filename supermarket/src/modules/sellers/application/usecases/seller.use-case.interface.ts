import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../domain/schemas/dto/response/seller.response';

export interface InterfaceUseCaseSeller {
  findAllSellers(): SellerResponse[];
  findSellerById(idSeller: string): SellerResponse | null;
  createSeller(sellerRequest: SellerRequest): SellerResponse | null;
  updateSeller(
    idSeller: string,
    sellerRequest: SellerRequest
  ): SellerResponse | null;
}
