import { DatabaseMockup } from '../../../../../database/mockup/database';
import { InterfaceInvoiceRepository } from '../../../domain/contracts/invoice.repository.interface';
import { InvoiceResponse } from '../../../domain/schemas/dto/response/invoice.response';
import { InvoiceModel } from '../../../domain/schemas/model/invoice.model';
import { InvoiceAdapter } from '../../adapters/invoice.adapter';

export class InvoiceRepositoryMockupImplementation
  implements InterfaceInvoiceRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  findAllInvoices(): InvoiceResponse[] {
    return Array.from(
      this.databaseMockup.getInvoices().getTable().values()
    ).map(InvoiceAdapter.invoiceModelToInvoiceResponse);
  }

  createInvoice(invoiceModel: InvoiceModel): InvoiceResponse | null {
    const invoiceCreated: InvoiceModel | undefined = this.databaseMockup
      .getInvoices()
      .add(invoiceModel.getIdInvoice(), invoiceModel);
    return invoiceCreated !== undefined
      ? InvoiceAdapter.invoiceModelToInvoiceResponse(invoiceCreated)
      : null;
  }
}
