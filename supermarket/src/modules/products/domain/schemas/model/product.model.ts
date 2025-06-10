import { ProductCategoryModel } from './category-product.model';

export class ProductModel {
  private code: string;
  private name: string;
  private description: string;
  private iva: number;
  private category: ProductCategoryModel;
  private stock: number;
  private publicPrice: number;
  private supplierPrice: number;

  constructor(
    code: string,
    name: string,
    description: string,
    iva: number,
    category: ProductCategoryModel,
    stock: number,
    publicPrice: number,
    supplierPrice: number
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.iva = iva;
    this.category = category;
    this.stock = stock;
    this.publicPrice = publicPrice;
    this.supplierPrice = supplierPrice;
  }

  public getCode(): string {
    return this.code;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getIva(): number {
    return this.iva;
  }

  public setIva(iva: number): void {
    this.iva = iva;
  }

  public getCategory(): ProductCategoryModel {
    return this.category;
  }

  public setCategory(category: ProductCategoryModel): void {
    this.category = category;
  }

  public getStock(): number {
    return this.stock;
  }

  public setStock(stock: number): void {
    this.stock = stock;
  }

  public getPublicPrice(): number {
    return this.publicPrice;
  }

  public setPublicPrice(publicPrice: number): void {
    this.publicPrice = publicPrice;
  }

  public getSupplierPrice(): number {
    return this.supplierPrice;
  }

  public setSupplierPrice(supplierPrice: number): void {
    this.supplierPrice = supplierPrice;
  }
}
