import { Supermarket } from '../../../app/supermarket';
import { AppFactory } from '../../../factory/factory';
import { CartItemRequest } from '../../../modules/carts/domain/schemas/dto/request/cart-item.request';
import { CartRequest } from '../../../modules/carts/domain/schemas/dto/request/cart.request';
import { CartResponse } from '../../../modules/carts/domain/schemas/dto/response/cart.response';
import { CustomerRequest } from '../../../modules/customers/domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../../modules/customers/domain/schemas/dto/response/customer.response';
import { ProductRequest } from '../../../modules/products/domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../../modules/products/domain/schemas/dto/response/product.response';
import { ProductAdapter } from '../../../modules/products/infrastructure/adapters/product.adapter';
import {
  isPositiveNumberPrompt,
  isValidDatePrompt,
  isValidNumberDefaultZeroPrompt,
  promptNonEmptyString
} from '../../../shared/validators/input-validator';
import {
  printListQueueTable,
  printListTable,
  printTableWithItems
} from '../../components/form/print.custom.table';
import { MessageType, ShowMessage } from '../../messages/message.util';
import { pause } from '../../utils/readline/read-line';

export class CartsMain {
  constructor(private readonly appFactory: AppFactory) {}

  async main(supermarket: Supermarket) {
    let options: string = `${ShowMessage.message(
      `WELCOME TO THE CARTS MODULE`,
      'title',
      true
    )}\nChoose an option:
      1. ${ShowMessage.message(`Serving Customers`, 'success', true)}
      2. ${ShowMessage.message(`View carts list`, 'success', true)}
      3. ${ShowMessage.message(`Search cart by Customer ID`, 'success', true)}
      4. ${ShowMessage.message(`Search cart by ID`, 'success', true)}
      5. ${ShowMessage.message(`View Queue`, 'success', true)}
      6. ${ShowMessage.message(`Back to Main`, 'back', true)}
      `;
    let option: number;
    while (true) {
      console.clear();
      console.log(options);
      option = isPositiveNumberPrompt('Choose an option: ');
      const endOption: number = 6;
      const isValidOption: boolean = option > 0 && option < endOption;
      if (isValidOption) {
        if (option === 1) {
          await this.servingCustomersOption(supermarket);
        }
        if (option === 2) {
          await this.viewCartsOptions();
        }
        if (option === 3) {
          await this.searchCartByCustomerId();
        }
        if (option === 4) {
          await this.searchCartById();
        }
        if (option === 5) {
          await this.viewCartQueueOption(supermarket);
        }
        await pause();
      } else if (option > endOption) {
        console.log(
          ShowMessage.message('Option is not valid! Try again!', 'error', true)
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

  private async addToCart(
    cartRequest: CartRequest,
    isNewCustomer: boolean,
    supermarket: Supermarket
  ): Promise<void> {
    let options: string = `${ShowMessage.message(
      `🛒 ADD PRODUCTS TO THE CART FOR: ${cartRequest.customer.firstName} ${cartRequest.customer.lastName} 🛒`,
      'title',
      true
    )}\nChoose an option:
      1. ${ShowMessage.message(`Add new product`, 'success', true)}
      2. ${ShowMessage.message(`Save Cart`, 'success', true)}
      3. ${ShowMessage.message(`Cancel`, 'error', true)}
      `;
    let option: number;
    let brand: boolean = true;
    while (brand) {
      console.clear();
      console.log(options);
      printTableWithItems(cartRequest, 'Cart details created');
      option = isPositiveNumberPrompt('Enter an option: ');
      let code: string;
      let quantity: number;
      let cartItemRequest: CartItemRequest;
      if (option === 1) {
        //Add to cart
        code = promptNonEmptyString('Enter the product code: ');
        const productFound: ProductResponse | null =
          await this.appFactory.productController.findProductByCode(code);
        if (productFound !== null) {
          quantity = isPositiveNumberPrompt('Enter the products quantity: ');
          const productRequest: ProductRequest =
            ProductAdapter.productResponseToProductRequest(productFound!);
          cartItemRequest = new CartItemRequest(
            cartRequest,
            productRequest,
            quantity
          );
          const addToCart: string[] = this.appFactory.cartController.addToCart(
            cartItemRequest,
            cartRequest
          );
          const messageType: MessageType = addToCart[1] as MessageType;
          console.log(ShowMessage.message(addToCart[0], messageType, true));
          await pause();
        } else {
          console.log(
            ShowMessage.message(
              `Product with ID: ${code} not found!`,
              'error',
              true
            )
          );
          await pause();
        }
        brand = true;
      } else if (option === 2) {
        if (cartRequest.cartItems.size() > 0) {
          if (isNewCustomer) {
            this.appFactory.customerController.createCustomer(
              cartRequest.customer
            );
          }
          const priority: number = isValidNumberDefaultZeroPrompt(
            'Enter the priority value (⏎ Enter to Default 0): '
          );
          const cartCreated: CartResponse | null =
            await this.appFactory.cartController.createCart(cartRequest);
          /*
          Array.from(cartRequest.cartItems.getTable().values()).forEach(
            (cartItemRequest) => {
              this.appFactory.cartItemController.createCartItem(
                cartItemRequest
              );
            }
          );
          */
          cartRequest.idCart = cartCreated?.idCart;
          supermarket
            .getCustomersQueue()
            .addItemPriority(priority, cartRequest!);
          console.log(
            ShowMessage.message(`Cart saved successfully!`, 'success', true)
          );
          break;
        } else {
          console.log(
            ShowMessage.message(
              `Cart cannot be created without items`,
              'warning',
              true
            )
          );
        }
        await pause();
      } else if (option === 3) {
        console.log(
          ShowMessage.message(`Leaving from Add to cart!`, 'info', true)
        );
        break;
      } else {
        console.log(
          ShowMessage.message(
            `❌ Option is not valid! Try again!`,
            'error',
            true
          )
        );
        await pause();
      }
    }
  }

  private async continueWithAnExistingCustomer(
    supermarket: Supermarket
  ): Promise<void> {
    let idCustomer: string;
    idCustomer = promptNonEmptyString('Enter the customer ID: ');
    const customer: CustomerResponse | null =
      await this.appFactory.customerController.findCustomerById(idCustomer);
    if (customer !== null) {
      const cartRequest: CartRequest = new CartRequest(
        new CustomerRequest(
          customer?.idCustomer,
          customer?.birthDate,
          customer?.person.cardId,
          customer?.person.firstName,
          customer?.person.lastName,
          customer?.person.email,
          customer?.person.address,
          customer?.person.phone
        )
      );
      await this.addToCart(cartRequest, false, supermarket);
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

  private async continueWithNewCustomer(
    supermarket: Supermarket
  ): Promise<void> {
    let idCustomer: string;
    idCustomer = promptNonEmptyString('Enter the customer ID: ');
    const customer: CustomerResponse | null =
      await this.appFactory.customerController.findCustomerById(idCustomer);
    if (customer === null) {
      const birthDate: string = isValidDatePrompt(
        'Enter the birth date (YYYY-MM-DD): '
      );
      const cardId: string = promptNonEmptyString('Enter the card ID: ');
      const firstName: string = promptNonEmptyString('Enter the first name: ');
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

      const cartRequest: CartRequest = new CartRequest(customerRequest);
      await this.addToCart(cartRequest, true, supermarket);
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

  private async searchCartById(): Promise<void> {
    const idCart: number = isPositiveNumberPrompt('Enter the cart ID: ');
    const cartResponse: CartResponse | null =
      await this.appFactory.cartController.findCartById(idCart);
    if (cartResponse !== null) {
      printTableWithItems(cartResponse, 'Cart list');
    } else {
      console.log(
        ShowMessage.message(`Cart with ID: ${idCart} not found!`, 'error', true)
      );
    }
  }

  private async searchCartByCustomerId(): Promise<void> {
    const idCustomer: string = promptNonEmptyString('Enter the Customer ID: ');
    const cart: CartResponse[] =
      await this.appFactory.cartController.findCartByCustomer(idCustomer);
    if (cart.length > 0) {
      printListTable(cart, `Cart details`);
    } else {
      const customer: CustomerResponse | null =
        await this.appFactory.customerController.findCustomerById(idCustomer);
      if (customer === null) {
        console.log(
          ShowMessage.message(
            `Customer not found for ID: ${idCustomer}`,
            'error',
            true
          )
        );
      } else {
        console.log(
          ShowMessage.message(
            `No records found for customer: ${customer.person.firstName}`,
            'error',
            true
          )
        );
      }
    }
  }

  private async viewCartsOptions(): Promise<void> {
    const carts: CartResponse[] =
      await this.appFactory.cartController.findAllCarts();
    if (carts.length > 0) {
      printListTable(carts, 'Carts List');
    } else {
      console.log(ShowMessage.message(`Carts list is empty!`, 'warning', true));
    }
  }

  private async servingCustomersOption(
    supermarket: Supermarket
  ): Promise<void> {
    let options: string = `${ShowMessage.message(
      `WELCOME TO THE CUSTOMERS MODULE`,
      'title',
      true
    )}\nChoose an option:
    1. ${ShowMessage.message(
      `Continue with an existing customer`,
      'success',
      true
    )}
    2. ${ShowMessage.message(`Continue adding new customer`, 'success', true)}
    3. ${ShowMessage.message(`Back to main`, 'back', true)}
    `;
    let option: number;
    while (true) {
      console.clear();
      console.log(options);
      const endOption: number = 3;
      option = isPositiveNumberPrompt(`Choose an option: `);
      const isValidOption: boolean = option > 0 && option < endOption;
      if (isValidOption) {
        if (option === 1) {
          await this.continueWithAnExistingCustomer(supermarket);
        }
        if (option === 2) {
          console.log(`Continue with new client`);
          await this.continueWithNewCustomer(supermarket);
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
}
