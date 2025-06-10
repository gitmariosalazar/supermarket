import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';

export interface InterfaceInvoiceUseCase {
  findAllInvoices(): InvoiceResponse[];
  createInvoice(invoiceRequest: InvoiceRequest): InvoiceResponse | null;
}
