import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { TotalSalesResponse } from '../../domain/schemas/dto/request/total-sales';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';

export interface InterfaceInvoiceUseCase {
  findAllInvoices(): Promise<InvoiceResponse[]>;
  createInvoice(
    invoiceRequest: InvoiceRequest
  ): Promise<InvoiceResponse | null>;
  findInvoiceById(idInvoice: number): Promise<InvoiceResponse | null>;
  findInvoicesByCustomerId(idCustomer: string): Promise<InvoiceResponse[]>;
  findInvoiceByDate(date: string): Promise<InvoiceResponse[]>;
  getTotalSalesByDateRange(
    from: string,
    to: string
  ): Promise<TotalSalesResponse>;
  getTotalSales(): Promise<TotalSalesResponse>;
}
