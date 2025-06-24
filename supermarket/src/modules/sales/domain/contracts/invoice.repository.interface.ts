import { TotalSalesResponse } from '../schemas/dto/request/total-sales';
import { InvoiceResponse } from '../schemas/dto/response/invoice.response';
import { InvoiceModel } from '../schemas/model/invoice.model';

export interface InterfaceInvoiceRepository {
  findAllInvoices(): Promise<InvoiceResponse[]>;
  createInvoice(invoiceModel: InvoiceModel): Promise<InvoiceResponse | null>;
  findInvoiceById(idInvoice: number): Promise<InvoiceResponse | null>;
  findInvoicesByCustomerId(idCustomer: string): Promise<InvoiceResponse[]>;
  findInvoiceByDate(date: string): Promise<InvoiceResponse[]>;
  getTotalSalesByDateRange(
    from: string,
    to: string
  ): Promise<TotalSalesResponse>;
  getTotalSales(): Promise<TotalSalesResponse>;
}
