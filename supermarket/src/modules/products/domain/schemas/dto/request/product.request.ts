import { ProductCategoryRequest } from './product-category.request';

export class ProductRequest {
  public code: string;
  public name: string;
  public description: string;
  public iva: number;
  public category: ProductCategoryRequest;
  public stock: number;
  public supplierPrice: number;
  public publicPrice?: number;

  constructor(
    code: string,
    name: string,
    description: string,
    iva: number,
    category: ProductCategoryRequest,
    stock: number,
    supplierPrice: number
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.iva = iva;
    this.category = category;
    this.stock = stock;
    this.supplierPrice = supplierPrice;
    this.publicPrice = 0;
  }
}
