import { ProductModel } from '../../modules/products/domain/schemas/model/product.model';
import { HashMap } from '../../shared/models/hash-map';

export class Supermarket {
  private inventory: HashMap<string, ProductModel>;

  constructor() {
    this.inventory = new HashMap();
  }

  initialize(): void {}

  public getInventory(): HashMap<string, ProductModel> {
    return this.inventory;
  }
}
