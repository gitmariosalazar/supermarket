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
      subtotal: invoiceModel.getSubtotal(),
      iva: invoiceModel.getIva(),
      total: invoiceModel.getTotal(),
      date: invoiceModel.getDate()
    };
    return invoiceResponse;
  }
}
