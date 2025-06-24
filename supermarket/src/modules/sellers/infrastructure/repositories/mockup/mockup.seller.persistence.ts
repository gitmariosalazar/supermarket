import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceSellerRepository } from '../../../domain/contracts/seller.repository.interface';
import { SellerResponse } from '../../../domain/schemas/dto/response/seller.response';
import { SellerModel } from '../../../domain/schemas/model/seller.model';
import { SellerAdapter } from '../../adapters/seller.adapter';

export class SellerRepositoryMockupImplementation
  implements InterfaceSellerRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  async findAllSellers(): Promise<SellerResponse[]> {
    return Array.from(this.databaseMockup.getSellers().getTable().values()).map(
      SellerAdapter.sellerModelToSellerResponse
    );
  }

  async findSellerById(idSeller: string): Promise<SellerResponse | null> {
    const sellerFound: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .find(idSeller);
    return sellerFound !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(sellerFound)
      : null;
  }

  async createSeller(sellerModel: SellerModel): Promise<SellerResponse | null> {
    const createdSeller: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .add(sellerModel.getIdSeller(), sellerModel);
    return createdSeller !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(createdSeller)
      : null;
  }

  async updateSeller(
    idSeller: string,
    sellerModel: SellerModel
  ): Promise<SellerResponse | null> {
    const updatedSeller: SellerModel | undefined = this.databaseMockup
      .getSellers()
      .update(idSeller, sellerModel);
    return updatedSeller !== undefined
      ? SellerAdapter.sellerModelToSellerResponse(updatedSeller)
      : null;
  }
}
