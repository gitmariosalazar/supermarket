import { CartAdapter } from '../../../carts/infrastructure/adapters/cart.adapter';
import { SellerAdapter } from '../../../sellers/infrastructure/adapters/seller.adapter';
import { InvoiceResponse } from '../../domain/schemas/dto/response/invoice.response';
import { InvoiceModel } from '../../domain/schemas/model/invoice.model';

export class InvoiceAdapter {
  static invoiceModelToInvoiceResponse(
    invoiceModel: InvoiceModel
  ): InvoiceResponse {
    const invoiceResponse: InvoiceResponse = {
      idInvoice: invoiceModel.getIdInvoice(),
      seller: SellerAdapter.sellerModelToSellerResponse(
        invoiceModel.getSalesman()
      ),
      cart: CartAdapter.cartModelToCartResponse(invoiceModel.getCart()),
      subtotal: 0,
      iva: 0,
      total: 0
    };
    return invoiceResponse;
  }
}
