import { AppFactory } from '../../../factory/factory';
import { CustomerRequest } from '../../../modules/customers/domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../../modules/customers/domain/schemas/dto/response/customer.response';
import {
  isPositiveNumberPrompt,
  isValidDatePrompt,
  promptNonEmptyString
} from '../../../shared/validators/input-validator';
import { printCustomersTable } from '../../components/form/print.custom.table';
import { ShowMessage } from '../../messages/message.util';
import { pause } from '../../utils/readline/read-line';

export class CustomerMain {
  constructor(private readonly appFactory: AppFactory) {}

  async main() {
    let options: string = `${ShowMessage.message(
      `WELCOME TO THE CUSTOMERS MODULE`,
      'info',
      true
    )}\nChoose an option:
    1. ${ShowMessage.message(`Add new Customer`, 'success', true)}
    2. ${ShowMessage.message(`Update Customer`, 'success', true)}
    3. ${ShowMessage.message(`Search Customer`, 'success', true)}
    4. ${ShowMessage.message(`Customers List`, 'success', true)}
    5. ${ShowMessage.message(`Back to Main`, 'back', true)}
    `;
    let option: number;
    while (true) {
      console.clear();
      console.log(options);
      option = isPositiveNumberPrompt('Choose an option: ');
      const endOption: number = 5;
      const isValidOption: boolean = option > 0 && option < endOption;
      if (isValidOption) {
        if (option === 1) {
          await this.addCustomerOption();
        }
        if (option === 2) {
          await this.updateCustomerOption();
        }
        if (option === 3) {
          await this.searchCustomerOption();
        }
        if (option === 4) {
          await this.listCustomersOption();
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
        break;
      }
    }
  }

  private async listCustomersOption(): Promise<void> {
    console.clear();
    console.log(ShowMessage.message(`Find All Customers`, 'info', true));
    const customers: CustomerResponse[] =
      await this.appFactory.customerController.findAllCustomers();
    printCustomersTable(customers, `Customer List`);
  }

  private async searchCustomerOption(): Promise<void> {
    console.clear();
    console.log(ShowMessage.message(`Search customer`, 'info', true));
    const idCustomer: string = promptNonEmptyString('Enter the customer ID: ');
    const customerFound: CustomerResponse | null =
      await this.appFactory.customerController.findCustomerById(idCustomer);
    if (customerFound !== null) {
      printCustomersTable([customerFound], `Customer with ID: ${idCustomer}`);
    } else {
      console.log(
        ShowMessage.message(
          `Customer with ID: ${idCustomer} not found`,
          'warning',
          true
        )
      );
    }
  }

  private async updateCustomerOption(): Promise<void> {
    //console.clear();
    let idCustomer: string;

    while (true) {
      idCustomer = promptNonEmptyString('Enter the ID Customer: ');
      const customerFound: CustomerResponse | null =
        await this.appFactory.customerController.findCustomerById(idCustomer);
      if (customerFound !== null) {
        printCustomersTable([customerFound], `Customer with ID: ${idCustomer}`);
        console.log(
          ShowMessage.message(
            'Enter the information about the Customer you want to update',
            'info',
            true
          )
        );
        const birthDate: string = isValidDatePrompt(
          'Enter the birth date (YYYY-MM-DD): '
        );
        const cardId: string = promptNonEmptyString('Enter the card ID: ');
        const firstName: string = promptNonEmptyString(
          'Enter the first name: '
        );
        const lastName: string = promptNonEmptyString('Enter the last name: ');
        const address: string = promptNonEmptyString('Enter the address: ');
        const phone: string = promptNonEmptyString('Enter the phone number: ');
        const email: string = promptNonEmptyString('Enter the email address: ');
        const customerRequest: CustomerRequest = new CustomerRequest(
          idCustomer,
          new Date(birthDate),
          cardId,
          firstName,
          lastName,
          email,
          address,
          phone
        );
        const customerCreated: CustomerResponse | null =
          await this.appFactory.customerController.updateCustomer(
            idCustomer,
            customerRequest
          );
        if (customerCreated !== null) {
          console.log(
            ShowMessage.message(
              `Customer was updated successfully!`,
              'success',
              true
            )
          );
          printCustomersTable([customerCreated], 'Customer updated');
        } else {
          console.log(
            ShowMessage.message(`Error updating new customer!`, 'error', true)
          );
        }
        break;
      } else {
        console.log(
          ShowMessage.message(
            `Customer with ID: ${idCustomer} not found!`,
            'error',
            true
          )
        );
      }
    }
  }

  public async addCustomerOption(): Promise<void> {
    console.clear();
    console.log(ShowMessage.message('Add customer', 'info', true));
    let idCustomer: string;

    while (true) {
      idCustomer = promptNonEmptyString('Enter the ID Customer: ');
      const customerFound: CustomerResponse | null =
        await this.appFactory.customerController.findCustomerById(idCustomer);
      if (customerFound === null) {
        const birthDate: string = isValidDatePrompt(
          'Enter the birth date (YYYY-MM-DD): '
        );
        const cardId: string = promptNonEmptyString('Enter the card ID: ');
        const firstName: string = promptNonEmptyString(
          'Enter the first name: '
        );
        const lastName: string = promptNonEmptyString('Enter the last name: ');
        const address: string = promptNonEmptyString('Enter the address: ');
        const phone: string = promptNonEmptyString('Enter the phone number: ');
        const email: string = promptNonEmptyString('Enter the email address: ');
        const customerRequest: CustomerRequest = new CustomerRequest(
          idCustomer,
          new Date(birthDate),
          cardId,
          firstName,
          lastName,
          email,
          address,
          phone
        );
        const customerCreated: CustomerResponse | null =
          await this.appFactory.customerController.createCustomer(
            customerRequest
          );
        if (customerCreated !== null) {
          console.log(
            ShowMessage.message(
              `Customer was created successfully!`,
              'success',
              true
            )
          );
          printCustomersTable([customerCreated], 'Customer created');
        } else {
          console.log(
            ShowMessage.message(`Error adding new customer!`, 'error', true)
          );
        }
        break;
      } else {
        console.log(
          ShowMessage.message(
            `Customer with ID: ${idCustomer} already exist!`,
            'error',
            true
          )
        );
      }
    }
  }
}
