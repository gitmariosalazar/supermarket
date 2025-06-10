import { CartMapper } from '../../../carts/application/mappers/cart.mapper';
import { SellerMapper } from '../../../sellers/application/mappers/seller.mapper';
import { InvoiceRequest } from '../../domain/schemas/dto/request/invoice.request';
import { InvoiceModel } from '../../domain/schemas/model/invoice.model';

export class InvoiceMapper {
  static invoiceRequestToInvoiceModel(
    invoiceRequest: InvoiceRequest
  ): InvoiceModel {
    const invoiceModel: InvoiceModel = new InvoiceModel(
      SellerMapper.sellerRequestToSellerModel(invoiceRequest.seller),
      CartMapper.cartRequestToCartModel(invoiceRequest.cart)
    );
    return invoiceModel;
  }
}
