import { SellerService } from '../../application/services/seller.use-case.service';
import { SellerRequest } from '../../domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../domain/schemas/dto/response/seller.response';

export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  findAllSellers(): SellerResponse[] {
    return this.sellerService.findAllSellers();
  }

  findSellerById(idSeller: string): SellerResponse | null {
    return this.sellerService.findSellerById(idSeller);
  }

  createSeller(sellerRequest: SellerRequest): SellerResponse | null {
    return this.sellerService.createSeller(sellerRequest);
  }

  updateSeller(
    idSeller: string,
    sellerRequest: SellerRequest
  ): SellerResponse | null {
    return this.sellerService.updateSeller(idSeller, sellerRequest);
  }
}
