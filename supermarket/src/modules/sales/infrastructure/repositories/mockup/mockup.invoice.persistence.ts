import { DatabaseMockup } from '../../../../../database/mockup/database';
import { formatDate } from '../../../../../ui/utils/format/format-date';
import { InterfaceInvoiceRepository } from '../../../domain/contracts/invoice.repository.interface';
import { TotalSalesResponse } from '../../../domain/schemas/dto/request/total-sales';
import { InvoiceResponse } from '../../../domain/schemas/dto/response/invoice.response';
import { InvoiceModel } from '../../../domain/schemas/model/invoice.model';
import { InvoiceAdapter } from '../../adapters/invoice.adapter';

export class InvoiceRepositoryMockupImplementation
  implements InterfaceInvoiceRepository
{
  constructor(private readonly databaseMockup: DatabaseMockup) {}

  async findAllInvoices(): Promise<InvoiceResponse[]> {
    return Array.from(
      this.databaseMockup.getInvoices().getTable().values()
    ).map(InvoiceAdapter.invoiceModelToInvoiceResponse);
  }

  async createInvoice(
    invoiceModel: InvoiceModel
  ): Promise<InvoiceResponse | null> {
    const keys: number[] = Array.from(
      this.databaseMockup.getInvoices().getTable().keys()
    );

    const maxId: number = keys.length === 0 ? 1 : Math.max(...keys) + 1;
    invoiceModel.setIdInvoice(maxId);
    const invoiceCreated: InvoiceModel | undefined = this.databaseMockup
      .getInvoices()
      .add(invoiceModel.getIdInvoice(), invoiceModel);
    if (invoiceCreated !== null) {
      invoiceModel
        .getCart()
        .getCartItems()
        .getTable()
        .forEach((itemModel) => {
          this.databaseMockup
            .getInventory()
            .update(itemModel.getProduct().getCode(), itemModel.getProduct());
        });
    }
    return invoiceCreated !== undefined
      ? InvoiceAdapter.invoiceModelToInvoiceResponse(invoiceCreated)
      : null;
  }

  async findInvoiceByDate(date: string): Promise<InvoiceResponse[]> {
    const fromDate = new Date(date);
    return Array.from(this.databaseMockup.getInvoices().getTable().values())
      .filter((invoiceModel) => {
        const invoiceDate = new Date(invoiceModel.getDate());

        const isTrue: boolean =
          invoiceDate.getFullYear() === fromDate.getFullYear() &&
          invoiceDate.getMonth() === fromDate.getMonth() &&
          invoiceDate.getDate() === fromDate.getDate() + 1;

        return isTrue;
      })
      .map((invoice) => InvoiceAdapter.invoiceModelToInvoiceResponse(invoice));
  }

  async findInvoiceById(idInvoice: number): Promise<InvoiceResponse | null> {
    const invoiceFound: InvoiceModel | undefined = this.databaseMockup
      .getInvoices()
      .find(idInvoice);
    return invoiceFound !== undefined
      ? InvoiceAdapter.invoiceModelToInvoiceResponse(invoiceFound)
      : null;
  }

  async findInvoicesByCustomerId(
    idCustomer: string
  ): Promise<InvoiceResponse[]> {
    return Array.from(this.databaseMockup.getInvoices().getTable().values())
      .filter(
        (invoiceModel) =>
          invoiceModel.getCart().getCustomer().getIdCustomer() === idCustomer
      )
      .map(InvoiceAdapter.invoiceModelToInvoiceResponse);
  }

  async getTotalSales(): Promise<TotalSalesResponse> {
    const invoices: InvoiceModel[] = Array.from(
      this.databaseMockup.getInvoices().getTable().values()
    );

    let fromDate: string = '';
    let toDate: string = '';

    if (invoices.length > 0) {
      fromDate = formatDate(invoices[0].getDate());
      toDate = formatDate(invoices[invoices.length - 1].getDate());
    }
    let investment = 0;
    let totalIva = 0;
    let totalAmount = 0;
    let netProfit = 0;
    let totalItemsSold = 0;
    let totalOrders = 0;

    invoices.forEach((invoice) => {
      const invoiceDate = new Date(invoice.getDate());

      if (invoices.length > 0) {
        totalOrders++;

        const cartItems = invoice.getCart().getCartItems().getTable().values();

        for (const item of cartItems) {
          investment +=
            item.getProduct().getSupplierPrice() * item.getQuantity();
          totalItemsSold += item.getQuantity();
          totalAmount += item.getCart().getTotal();
          totalIva += item.getCart().getIva();
        }
      }
    });
    netProfit = totalAmount - investment - totalIva;

    const totalSales: TotalSalesResponse = {
      investment: Number(investment.toFixed(2)),
      totalIva: Number(totalIva.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      netProfit: Number(netProfit.toFixed(2)),
      totalOrders,
      totalItemsSold,
      dateRange: { from: fromDate, to: toDate }
    };

    return totalSales;
  }

  async getTotalSalesByDateRange(
    from: string,
    to: string
  ): Promise<TotalSalesResponse> {
    const invoices: InvoiceModel[] = Array.from(
      this.databaseMockup.getInvoices().getTable().values()
    );

    const fromDate = new Date(from);
    const toDate = new Date(to);

    let investment = 0;
    let totalIva = 0;
    let totalAmount = 0;
    let netProfit = 0;
    let totalItemsSold = 0;
    let totalOrders = 0;

    invoices.forEach((invoice) => {
      const invoiceDate = new Date(invoice.getDate());

      if (invoiceDate >= fromDate && invoiceDate <= toDate) {
        totalOrders++;

        const cartItems = invoice.getCart().getCartItems().getTable().values();

        for (const item of cartItems) {
          investment +=
            item.getProduct().getSupplierPrice() * item.getQuantity();
          totalItemsSold += item.getQuantity();
          totalAmount += item.getCart().getTotal();
          totalIva += item.getCart().getIva();
        }
      }
    });
    netProfit = totalAmount - investment - totalIva;

    const totalSales: TotalSalesResponse = {
      investment: Number(investment.toFixed(2)),
      totalIva: Number(totalIva.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      netProfit: Number(netProfit.toFixed(2)),
      totalOrders,
      totalItemsSold,
      dateRange: { from, to }
    };

    return totalSales;
  }
}
