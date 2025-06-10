import { InvoiceService } from '../../application/services/invoice.use-case.service';
import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';

export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  findAllInvoices(): InvoiceResponse[] {
    return this.invoiceService.findAllInvoices();
  }

  createInvoice(invoiceRequest: InvoiceRequest): InvoiceResponse | null {
    return this.invoiceService.createInvoice(invoiceRequest);
  }
}
