import chalk from 'chalk';
import { CustomerRequest } from '../../../modules/customers/domain/schemas/dto/request/customer.request';
import { CustomerResponse } from '../../../modules/customers/domain/schemas/dto/response/customer.response';
import { CustomerModel } from '../../../modules/customers/domain/schemas/model/customer.model';
import { SellerRequest } from '../../../modules/sellers/domain/schemas/dto/request/seller.request';
import { SellerResponse } from '../../../modules/sellers/domain/schemas/dto/response/seller.response';
import { SellerModel } from '../../../modules/sellers/domain/schemas/model/seller.model';
import { ShowMessage } from '../../messages/message.util';
import { FooterDetails } from '../../interfaces/models.data.interface';
export const printTable = (
  dataTable: any[],
  headersColumns: string[],
  title: string,
  customer?: CustomerRequest | CustomerResponse | CustomerModel,
  seller?: SellerRequest | SellerResponse | SellerModel,
  footerDetails?: FooterDetails
) => {
  let infoLeft: string[] = [];
  if (customer) {
    if (customer instanceof CustomerRequest) {
      infoLeft = [
        `Full Name  : ${customer.firstName} ${customer.lastName}`,
        `CARD ID    : ${customer.cardId}    ID: ${customer.idCustomer}`,
        `Address    : ${customer.address}`,
        `Email      : ${customer.email}`
      ];
    } else if (customer instanceof CustomerModel) {
      infoLeft = [
        `Full Name  : ${customer.getFirstName()} ${customer.getLastName()}`,
        `CARD ID    : ${customer.getCardId()}    ID: ${customer.getIdCustomer()}`,
        `Address    : ${customer.getAddress()}`,
        `Email      : ${customer.getEmail()}`
      ];
    } else {
      infoLeft = [
        `Full Name  : ${customer.person.firstName} ${customer.person.lastName}`,
        `CARD ID    : ${customer.person.cardId}    ID: ${customer.idCustomer}`,
        `Address    : ${customer.person.address}`,
        `Email      : ${customer.person.email}`
      ];
    }
  }

  let infoRight: string[] = [];
  if (seller) {
    const dateStr = new Date().toLocaleString();
    if (seller instanceof SellerRequest) {
      infoRight = [
        `${dateStr}`,
        `Seller ID   : ${seller.idSeller}`,
        `Seller Name : ${seller.firstName} ${seller.lastName}`
      ];
    } else if (seller instanceof SellerModel) {
      infoRight = [
        `${dateStr}`,
        `Seller ID   : ${seller.getIdSeller()}`,
        `Seller Name : ${seller.getFirstName()} ${seller.getLastName()}`
      ];
    } else {
      infoRight = [
        `${dateStr}`,
        `Seller ID   : ${seller.idSeller}`,
        `Seller Name : ${seller.person.firstName} ${seller.person.lastName}`
      ];
    }
  }

  const columnWidths = headersColumns.map((header) =>
    Math.max(
      ...dataTable.map((item) => String(item[header]).length),
      header.length
    )
  );

  let divider = '+';
  columnWidths.forEach((width) => (divider += '-'.repeat(width + 2) + '+'));
  const totalWidth = divider.length;
  console.log(divider);
  // CENTER TITLE
  const centeredTitle = title.padStart((totalWidth + title.length) / 2, ' ');
  console.log(ShowMessage.message(centeredTitle, 'success', true));

  if (customer || seller) {
    console.log(divider);
  }

  const lines = Math.max(infoLeft.length, infoRight.length);
  for (let i = 0; i < lines; i++) {
    const left = infoLeft[i] || '';
    const right = infoRight[i] || '';
    const spacing = totalWidth - left.length - right.length;
    console.log(left + ' '.repeat(spacing > 0 ? spacing : 1) + right);
  }

  console.log(divider);

  let headerLine = '|';
  headersColumns.forEach((header, i) => {
    headerLine += ` ${header.padEnd(columnWidths[i], ' ')} |`;
  });
  console.log(ShowMessage.message(headerLine, 'info', true));
  console.log(divider);
  if (dataTable.length > 0) {
    // Rows
    dataTable.forEach((item) => {
      let rowLine = '|';
      headersColumns.forEach((header, i) => {
        rowLine += ` ${String(item[header]).padEnd(columnWidths[i], ' ')} |`;
      });
      console.log(rowLine);
    });
  } else {
    title = 'Data not found';
    const centeredMessage = title.padStart(
      (totalWidth + title.length) / 2,
      ' '
    );
    console.log(ShowMessage.message(centeredMessage, 'warning', true));
  }
  console.log(divider);
  if (footerDetails) {
    const footer: string =
      `Subtotal   : ${footerDetails?.subtotal.toFixed(2)}`.padStart(
        totalWidth - 1
      ) +
      '\n' +
      `IVA        : ${footerDetails?.iva.toFixed(2)}`.padStart(totalWidth - 1) +
      '\n' +
      `Total      : ${footerDetails?.total.toFixed(2)}`.padStart(
        totalWidth - 1
      );
    console.log(chalk.bold.greenBright(footer));
    console.log(divider);
  }
};
