import { SellerMapper } from './../mappers/seller.mapper';
import { InterfaceSellerRepository } from '../../domain/contracts/seller.repository.interface';
import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../domain/schemas/dto/response/seller.response';
import { InterfaceUseCaseSeller } from '../usecases/seller.use-case.interface';

export class SellerService implements InterfaceUseCaseSeller {
  constructor(private readonly sellerRepository: InterfaceSellerRepository) {}

  findAllSellers(): Promise<SellerResponse[]> {
    return this.sellerRepository.findAllSellers();
  }

  findSellerById(idSeller: string): Promise<SellerResponse | null> {
    return this.sellerRepository.findSellerById(idSeller);
  }

  createSeller(sellerRequest: SellerRequest): Promise<SellerResponse | null> {
    return this.sellerRepository.createSeller(
      SellerMapper.sellerRequestToSellerModel(sellerRequest)
    );
  }

  updateSeller(
    idSeller: string,
    sellerRequest: SellerRequest
  ): Promise<SellerResponse | null> {
    return this.sellerRepository.updateSeller(
      idSeller,
      SellerMapper.sellerRequestToSellerModel(sellerRequest)
    );
  }
}
