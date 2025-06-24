import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../domain/schemas/dto/response/seller.response';

export interface InterfaceUseCaseSeller {
  findAllSellers(): Promise<SellerResponse[]>;
  findSellerById(idSeller: string): Promise<SellerResponse | null>;
  createSeller(sellerRequest: SellerRequest): Promise<SellerResponse | null>;
  updateSeller(
    idSeller: string,
    sellerRequest: SellerRequest
  ): Promise<SellerResponse | null>;
}
