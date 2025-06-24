import { AppFactory } from './factory/factory';
import { Supermarket } from './app/supermarket';
import { ShowMessage } from './ui/messages/message.util';
import {
  isPositiveNumberPrompt,
  promptNonEmptyString
} from './shared/validators/input-validator';
import { SellerResponse } from './modules/sellers/domain/schemas/dto/response/seller.response';
import { CartsMain } from './ui/main/carts/carts.main';
import { ProductsMain } from './ui/main/products/products.main';
import { SalesMain } from './ui/main/sales/sales.main';
import { CustomerMain } from './ui/main/customers/customer.main';
import { SellerRequest } from './modules/sellers/domain/schemas/dto/request/seller.request';
import { closeReadline, pause } from './ui/utils/readline/read-line';
export class App {
  private readonly cartsMain: CartsMain;
  private readonly productsMain: ProductsMain;
  private readonly salesMain: SalesMain;
  private readonly customersMain: CustomerMain;

  constructor(private readonly appFactory: AppFactory) {
    this.cartsMain = new CartsMain(appFactory);
    this.productsMain = new ProductsMain(appFactory);
    this.salesMain = new SalesMain(appFactory);
    this.customersMain = new CustomerMain(appFactory);
  }

  async menu(
    supermarket: Supermarket,
    sellerRequest: SellerRequest
  ): Promise<void> {
    const options: string = `${ShowMessage.message(
      `WELCOME TO THE SALES MODULE`,
      'title',
      true
    )}\nChoose an option:
         1. ${ShowMessage.message(`📦 Products Module`, 'title', true)}
         2. ${ShowMessage.message(`🛒 Carts Module`, 'title', true)}
         3. ${ShowMessage.message(`🙋 Customers Module`, 'title', true)}
         4. ${ShowMessage.message(`💵 Sales Module`, 'title', true)}
         5. ${ShowMessage.message(`Exit`, 'error', true)}
         `;
    const endOption: number = 5;

    while (true) {
      console.clear();
      console.log(options);
      try {
        const option = await isPositiveNumberPrompt(`Enter the option: `);
        const isValidOption: boolean = option > 0 && option <= endOption;

        if (isValidOption) {
          if (option === 1) {
            await this.productsMain.main();
          } else if (option === 2) {
            await this.cartsMain.main(supermarket);
          } else if (option === 3) {
            await this.customersMain.main();
          } else if (option === 4) {
            await this.salesMain.main(supermarket, sellerRequest);
          } else if (option === 5) {
            console.log(
              ShowMessage.message(
                'Goodbye, I hope you come back soon. 👋👋',
                'info',
                true
              )
            );
            break;
          }
          await pause();
        } else {
          console.log(
            ShowMessage.message(
              '❌ Option is not valid! Try again!',
              'error',
              true
            )
          );
          await pause();
        }
      } catch (err) {
        console.error('Error en el menú:', err);
        await pause();
      }
    }
  }

  async main(supermarket: Supermarket): Promise<void> {
    const options: string = `${ShowMessage.message(
      `WELCOME TO THE SUPERMARKET`,
      'title',
      true
    )}\nChoose an option:
       1. ${ShowMessage.message(`Start app`, 'success', true)}
       2. ${ShowMessage.message(`Leave`, 'error', true)}
       `;
    const endOption: number = 2;
    let maxAttempts: number = 0;

    while (true) {
      console.clear();
      console.log(options);
      try {
        const option = await isPositiveNumberPrompt('Enter the option: ');

        if (option === 1) {
          while (true) {
            const idSeller: string = await promptNonEmptyString(
              `Enter the Seller ID to continue: `
            );
            const seller: SellerResponse | null =
              await this.appFactory.sellerController.findSellerById(idSeller);

            if (seller === null) {
              maxAttempts++;
              if (maxAttempts >= 3) {
                console.log(
                  ShowMessage.message(
                    `Maximum attempts exceeded!`,
                    'error',
                    true
                  )
                );
                console.log(
                  ShowMessage.message(
                    'Goodbye, I hope you come back soon. 👋👋',
                    'info',
                    true
                  )
                );
                await pause();
                return;
              } else {
                console.log(
                  ShowMessage.message(
                    `Seller ID is not valid, Try again!`,
                    'error',
                    true
                  )
                );
                await pause();
              }
            } else {
              const sellerRequest: SellerRequest = new SellerRequest(
                seller.idSeller,
                seller.hireDate,
                seller.salary,
                seller.person.cardId,
                seller.person.firstName,
                seller.person.lastName,
                seller.person.email,
                seller.person.address,
                seller.person.phone
              );
              await this.menu(supermarket, sellerRequest);
              break;
            }
          }
        } else if (option === 2) {
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
              `The option is not valid. Try again!`,
              'error',
              true
            )
          );
          await pause();
        }
      } catch (err) {
        console.error('Error en el bucle principal:', err);
        await pause();
      }
    }
  }
}

(async () => {
  try {
    const appFact = new AppFactory();
    const sm = new Supermarket(
      'SP001',
      `Mario's Supermarket`,
      'Ibarra - El Tejar',
      'mariosupermarket@gmail.com',
      '0994532438'
    );
    const app = new App(appFact);
    await app.main(sm);
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    closeReadline();
  }
})();
