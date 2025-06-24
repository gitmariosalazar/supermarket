import { InvoiceService } from '../../application/services/invoice.use-case.service';
import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { TotalSalesResponse } from '../../domain/schemas/dto/request/total-sales';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';

export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  findAllInvoices(): Promise<InvoiceResponse[]> {
    return this.invoiceService.findAllInvoices();
  }

  createInvoice(
    invoiceRequest: InvoiceRequest
  ): Promise<InvoiceResponse | null> {
    return this.invoiceService.createInvoice(invoiceRequest);
  }

  findInvoiceById(idInvoice: number): Promise<InvoiceResponse | null> {
    return this.invoiceService.findInvoiceById(idInvoice);
  }

  findInvoiceByDate(date: string): Promise<InvoiceResponse[]> {
    return this.invoiceService.findInvoiceByDate(date);
  }

  findInvoicesByCustomerId(idCustomer: string): Promise<InvoiceResponse[]> {
    return this.invoiceService.findInvoicesByCustomerId(idCustomer);
  }

  getTotalSalesByDateRange(
    from: string,
    to: string
  ): Promise<TotalSalesResponse> {
    return this.invoiceService.getTotalSalesByDateRange(from, to);
  }

  getTotalSales(): Promise<TotalSalesResponse> {
    return this.invoiceService.getTotalSales();
  }
}
