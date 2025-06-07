import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceSellerRepository } from '../../../domain/contracts/seller.repository.interface';
import { SellerResponse } from '../../../domain/schemas/dto/response/seller.response';
import { SellerModel } from '../../../domain/schemas/model/seller.model';
import { SellerAdapter } from '../../adapters/seller.adapter';

export class SellerRepositoryMockupImplementation
  implements InterfaceSellerRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  findAllSellers(): SellerResponse[] {
    return Array.from(this.databaseMockup.getSellers().getTable().values()).map(
      SellerAdapter.sellerModelToSellerResponse
    );
  }

  findSellerById(idSeller: string): SellerResponse | null {
    const sellerFound: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .find(idSeller);
    return sellerFound !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(sellerFound)
      : null;
  }

  createSeller(sellerModel: SellerModel): SellerResponse | null {
    const createdSeller: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .add(sellerModel.getIdSeller(), sellerModel);
    return createdSeller !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(createdSeller)
      : null;
  }

  updateSeller(
    idSeller: string,
    sellerModel: SellerModel
  ): SellerResponse | null {
    const updatedSeller: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .update(idSeller, sellerModel);
    return updatedSeller !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(updatedSeller)
      : null;
  }
}
