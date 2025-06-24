import { Supermarket } from '../../../app/supermarket';
import { AppFactory } from '../../../factory/factory';
import { CartRequest } from '../../../modules/carts/domain/schemas/dto/request/cart.request';
import { InvoiceRequest } from '../../../modules/sales/domain/schemas/dto/request/invoice.request';
import { TotalSalesResponse } from '../../../modules/sales/domain/schemas/dto/request/total-sales';
import { InvoiceResponse } from '../../../modules/sales/domain/schemas/dto/response/invoice.response';
import { SellerRequest } from '../../../modules/sellers/domain/schemas/dto/request/seller.request';
import {
  isPositiveNumberMinLimitPrompt,
  isPositiveNumberPrompt,
  isValidDatePrompt,
  promptNonEmptyString
} from '../../../shared/validators/input-validator';
import {
  printListQueueTable,
  printListTable,
  printTableWithItems
} from '../../components/form/print.custom.table';
import { ShowMessage } from '../../messages/message.util';
import { pause } from '../../utils/readline/read-line';

export class SalesMain {
  constructor(private readonly appFactory: AppFactory) {}

  async servingCartsCustomersInQueue(
    supermarket: Supermarket,
    sellerRequest: SellerRequest
  ): Promise<void> {
    let cartFirstInQueue: CartRequest | null = supermarket
      .getCustomersQueue()
      .nextShift();
    let back: boolean = true;
    while (back) {
      if (cartFirstInQueue !== null) {
        const options: string = `
    ${ShowMessage.message(
      'Collect, Print and Deliver Invoices in Queue',
      'title',
      true
    )}\n
    1. ${ShowMessage.message('Bill and print Invoice', 'success', true)}
    2. ${ShowMessage.message('Back', 'back', true)}
    `;
        let option: number;

        while (true) {
          console.clear();
          printListQueueTable(
            supermarket.getCustomersQueue(),
            'Customers waiting In Queue'
          );
          console.log(options);
          console.log(`
            ${ShowMessage.message(
              `Next Customer: ${cartFirstInQueue.customer.firstName} ${cartFirstInQueue.customer.lastName}`,
              'title',
              true
            )}
              ${ShowMessage.message(
                'Total Amount: ',
                'info',
                true
              )} $ ${ShowMessage.message(
            `${cartFirstInQueue.total?.toFixed(2)}`,
            undefined,
            true
          )}
            `);
          option = isPositiveNumberPrompt('Enter an option: ');
          if (option === 1) {
            const cartRequest: CartRequest = supermarket
              .getCustomersQueue()
              .nextShift()!;
            const invoiceRequest: InvoiceRequest = new InvoiceRequest(
              sellerRequest,
              cartRequest
            );
            const invoiceCreated: InvoiceResponse | null =
              await this.appFactory.invoiceController.createInvoice(
                invoiceRequest
              );
            if (invoiceCreated !== null) {
              let totalAmountDue: number = invoiceCreated.total;
              let amountReceived: number = isPositiveNumberMinLimitPrompt(
                `Enter the amount received: `,
                totalAmountDue
              );
              let changeToGive: number = amountReceived - totalAmountDue;
              console.log(
                ShowMessage.message(`
                Total Amount Due: $ ${totalAmountDue.toFixed(2)}
                 Amount Received: $ ${amountReceived.toFixed(2)}
                  Change to Give: $ ${changeToGive.toFixed(2)}
                `)
              );
              await pause();
              console.log(
                ShowMessage.message(
                  `Invoice created Successfully`,
                  'success',
                  true
                )
              );
              supermarket.getCustomersQueue().giveShift();
              cartFirstInQueue = supermarket.getCustomersQueue().nextShift();
            } else {
              console.log(
                ShowMessage.message(`Error creating invoice!`, 'error', true)
              );
            }
            break;
          }
          if (option === 2) {
            back = false;
            console.log(
              ShowMessage.message(
                'Goodbye, I hope you come back soon. 👋👋',
                'info',
                true
              )
            );
            break;
          } else {
            console.log(
              ShowMessage.message(
                'Option is not valid! Try again!',
                'error',
                true
              )
            );
          }
        }
      } else {
        break;
      }
    }
  }

  async main(supermarket: Supermarket, sellerRequest: SellerRequest) {
    let options: string = `${ShowMessage.message(
      `WELCOME TO THE SALES MODULE`,
      'title',
      true
    )}\nChoose an option:
       1. ${ShowMessage.message(`Serving Customers Queues`, 'success', true)}
       2. ${ShowMessage.message(`View Invoices`, 'success', true)}
       3. ${ShowMessage.message(
         `Search Invoices by Customer ID`,
         'success',
         true
       )}
       4. ${ShowMessage.message(`Search Invoice by ID`, 'success', true)}
       5. ${ShowMessage.message(
         `See total Sales By Rage Date`,
         'success',
         true
       )}
       6. ${ShowMessage.message(`Filter Invoices By Date`, 'success', true)}
       7. ${ShowMessage.message(`See total Sales`, 'success', true)}
       8. ${ShowMessage.message(`Back to Main`, 'back', true)}
       `;
    let option: number;
    while (true) {
      console.clear();
      console.log(options);
      const cartFirstInQueue: CartRequest | null = supermarket
        .getCustomersQueue()
        .nextShift();
      if (cartFirstInQueue !== null) {
        console.log(
          ShowMessage.message(
            `Customer ${cartFirstInQueue.customer.firstName} ${cartFirstInQueue.customer.lastName} is waiting in the queue!`,
            'warning',
            true
          )
        );
      }
      option = isPositiveNumberPrompt('Choose an option: ');
      const endOption: number = 8;
      const isValidOption: boolean = option > 0 && option < endOption;
      if (isValidOption) {
        if (option === 1) {
          await this.viewCartQueueOption(supermarket);
          await this.servingCartsCustomersInQueue(supermarket, sellerRequest);
        }
        if (option === 2) {
          await this.seeInvoicesOption();
        }
        if (option === 3) {
          await this.seeInvoiceByIdCustomerOption();
        }
        if (option === 4) {
          await this.seeInvoiceByIdOption();
        }
        if (option === 5) {
          await this.seeTotalSalesByRangeDateOption();
        }
        if (option === 6) {
          await this.seeInvoiceByDateOption();
        }
        if (option === 7) {
          await this.seeTotalSales();
        }
        await pause();
      } else if (option > endOption) {
        console.log(
          ShowMessage.message(
            '❌ Option is not valid! Try again!',
            'error',
            true
          )
        );
        await pause();
      }
      if (option === endOption) {
        console.log(
          ShowMessage.message(
            'Goodbye, I hope you come back soon. 👋👋',
            'info',
            true
          )
        );
        //await pause();
        break;
      }
    }
  }

  async viewCartQueueOption(supermarket: Supermarket): Promise<void> {
    const cartsInQueue = supermarket.getCustomersQueue();
    if (!cartsInQueue.isEmpty()) {
      printListQueueTable(cartsInQueue, 'Customers carts in Queue');
    } else {
      console.log(
        ShowMessage.message(
          `Customers carts in queue is empty!`,
          'warning',
          true
        )
      );
    }
  }

  async seeInvoicesOption(): Promise<void> {
    const invoices: InvoiceResponse[] =
      await this.appFactory.invoiceController.findAllInvoices();
    if (invoices.length > 0) {
      printListTable(invoices, 'List Invoices');
    } else {
      console.log(
        ShowMessage.message(`Invoice list not found!`, 'error', true)
      );
    }
  }

  async seeInvoiceByIdOption(): Promise<void> {
    const idInvoice: number = isPositiveNumberPrompt('Enter the Invoice ID: ');
    const invoiceFound: InvoiceResponse | null =
      await this.appFactory.invoiceController.findInvoiceById(idInvoice);
    if (invoiceFound !== null) {
      printTableWithItems(invoiceFound, `Invoice with Id: ${idInvoice}`);
    } else {
      console.log(
        ShowMessage.message(
          `Invoice with Id: ${idInvoice} not found!`,
          'error',
          true
        )
      );
    }
  }

  async seeInvoiceByDateOption(): Promise<void> {
    const date: string = promptNonEmptyString('Enter the date to search: ');
    const invoiceFound: InvoiceResponse[] =
      await this.appFactory.invoiceController.findInvoiceByDate(date);
    if (invoiceFound.length > 0) {
      printListTable(invoiceFound, `Invoices List with date: ${date}`);
    } else {
      console.log(
        ShowMessage.message(
          `Invoices List for the date: ${date} not found!`,
          'error',
          true
        )
      );
    }
  }

  async seeInvoiceByIdCustomerOption(): Promise<void> {
    const idCustomer: string = promptNonEmptyString('Enter the Customer ID: ');
    const invoiceFound: InvoiceResponse[] =
      await this.appFactory.invoiceController.findInvoicesByCustomerId(
        idCustomer
      );
    if (invoiceFound.length > 0) {
      printListTable(invoiceFound, `Invoice with Customer Id: ${idCustomer}`);
    } else {
      console.log(
        ShowMessage.message(
          `Invoice with Id: ${idCustomer} not found!`,
          'error',
          true
        )
      );
    }
  }

  async seeTotalSales(): Promise<void> {
    const totalSales: TotalSalesResponse =
      await this.appFactory.invoiceController.getTotalSales();
    console.log(totalSales);
  }

  async seeTotalSalesByRangeDateOption(): Promise<void> {
    const fromDate: string = isValidDatePrompt('Enter the from date: ');
    const toDate: string = isValidDatePrompt('Enter the to date: ');
    const from: Date = new Date(fromDate);
    const to: Date = new Date(toDate);
    if (from < to) {
      const totalSales: TotalSalesResponse =
        await this.appFactory.invoiceController.getTotalSalesByDateRange(
          fromDate,
          toDate
        );
      console.log(totalSales);
    } else {
      console.log(ShowMessage.message(`No records found!`, 'error', true));
    }
  }

  async seeInvoicesByDateOption(): Promise<void> {
    const date: string = isValidDatePrompt('Enter the from date: ');
    const invoices: InvoiceResponse[] =
      await this.appFactory.invoiceController.findInvoiceByDate(date);
    if (invoices.length > 0) {
      printListTable(invoices, 'Invoices List with Date: ' + date);
    } else {
      console.log(ShowMessage.message(`No records found!`, 'error', true));
    }
  }
}
