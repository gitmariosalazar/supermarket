import { InterfaceInvoiceRepository } from '../../domain/contracts/invoice.repository.interface';
import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { TotalSalesResponse } from '../../domain/schemas/dto/request/total-sales';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';
import { InvoiceMapper } from '../mappers/invoice.mapper';
import { InterfaceInvoiceUseCase } from '../usecases/invoice.use-case.interface';

export class InvoiceService implements InterfaceInvoiceUseCase {
  constructor(private readonly invoiceRepository: InterfaceInvoiceRepository) {}

  findAllInvoices(): Promise<InvoiceResponse[]> {
    return this.invoiceRepository.findAllInvoices();
  }

  createInvoice(
    invoiceRequest: InvoiceRequest
  ): Promise<InvoiceResponse | null> {
    return this.invoiceRepository.createInvoice(
      InvoiceMapper.invoiceRequestToInvoiceModel(invoiceRequest)
    );
  }

  findInvoiceById(idInvoice: number): Promise<InvoiceResponse | null> {
    return this.invoiceRepository.findInvoiceById(idInvoice);
  }

  findInvoiceByDate(date: string): Promise<InvoiceResponse[]> {
    return this.invoiceRepository.findInvoiceByDate(date);
  }

  findInvoicesByCustomerId(idCustomer: string): Promise<InvoiceResponse[]> {
    return this.invoiceRepository.findInvoicesByCustomerId(idCustomer);
  }

  getTotalSalesByDateRange(
    from: string,
    to: string
  ): Promise<TotalSalesResponse> {
    return this.invoiceRepository.getTotalSalesByDateRange(from, to);
  }
  getTotalSales(): Promise<TotalSalesResponse> {
    return this.invoiceRepository.getTotalSales();
  }
}
