import { InvoiceResponse } from '../schemas/dto/response/invoice.response';
import { InvoiceModel } from '../schemas/model/invoice.model';

export interface InterfaceInvoiceRepository {
  findAllInvoices(): InvoiceResponse[];
  createInvoice(invoiceModel: InvoiceModel): InvoiceResponse | null;
}
