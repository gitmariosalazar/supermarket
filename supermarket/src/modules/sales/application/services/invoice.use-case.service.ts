import { InterfaceInvoiceRepository } from '../../domain/contracts/invoice.repository.interface';
import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';
import { InvoiceMapper } from '../mappers/invoice.mapper';
import { InterfaceInvoiceUseCase } from '../usecases/invoice.use-case.interface';

export class InvoiceService implements InterfaceInvoiceUseCase {
  constructor(private readonly invoiceRepository: InterfaceInvoiceRepository) {}

  findAllInvoices(): InvoiceResponse[] {
    return this.invoiceRepository.findAllInvoices();
  }

  createInvoice(invoiceRequest: InvoiceRequest): InvoiceResponse | null {
    return this.invoiceRepository.createInvoice(
      InvoiceMapper.invoiceRequestToInvoiceModel(invoiceRequest)
    );
  }
}
