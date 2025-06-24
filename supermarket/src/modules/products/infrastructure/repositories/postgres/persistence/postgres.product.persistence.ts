import { DatabaseServicePostgreSQL } from '../../../../../../database/postgres/service/postgresql.service';
import { ProductResponseSQL } from '../../../../../../shared/interfaces/product.response.interface';
import { InterfaceProductRepository } from '../../../../domain/contracts/product.repository.interface';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../../domain/schemas/model/product.model';
import { ProductAdapter } from '../../../adapters/product.adapter';

export class ProductRepositoryPostgreSQLImplementation
  implements InterfaceProductRepository
{
  constructor(private readonly postgresSQLService: DatabaseServicePostgreSQL) {}

  async findAllProducts(): Promise<ProductResponse[]> {
    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" from product p inner join productcategory pc on p.id_category = pc.name;`
    );
    //console.log(products);
    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    console.log(productResponse);
    return productResponse;
  }

  async findProductByCode(code: string): Promise<ProductResponse | null> {
    const query: string = `
      SELECT p.code, p.name, p.description, p.iva, p.stock, 
             p.public_price AS "publicPrice", 
             p.supplier_price AS "supplierPrice", 
             pc.name AS "categoryName", 
             pc.description AS "categoryDescription"
      FROM product p
      INNER JOIN productcategory pc ON p.id_category = pc.name
      WHERE p.code = $1;
    `;

    const product = await this.postgresSQLService.query<ProductResponseSQL>(
      query,
      [code]
    );

    if (product.length > 0) {
      return {
        code: product[0].code,
        name: product[0].name,
        description: product[0].description,
        iva: Number(product[0].iva),
        category: {
          name: product[0].categoryName,
          description: product[0].categoryDescription
        },
        stock: Number(product[0].stock),
        publicPrice: Number(product[0].publicPrice),
        supplierPrice: Number(product[0].supplierPrice)
      };
    }

    return null;
  }

  async findProductWarningStock(): Promise<ProductResponse[]> {
    const query: string = `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" 
from product p inner join productcategory pc on p.id_category = pc.name and p.stock < 5;`;
    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      query
    );

    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    return productResponse;
  }

  async findProductsByCategoryName(
    categoryName: string
  ): Promise<ProductResponse[]> {
    const query: string = `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" 
from product p inner join productcategory pc on p.id_category = pc.name and pc.name = $1;`;

    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      query,
      [categoryName]
    );

    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    return productResponse;
  }

  async findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): Promise<ProductResponse[]> {
    const query: string = `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" 
from product p inner join productcategory pc on p.id_category = pc.name and p.stock between $1 and $2;`;
    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      query,
      [startStock, endStock]
    );

    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    return productResponse;
  }

  async findPurchasedProducts(): Promise<ProductResponse[]> {
    const query: string = `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" 
from product p inner join productcategory pc on p.id_category = pc.name right join cartitem c on c.code_product = p.code;`;
    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      query
    );

    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    return productResponse;
  }

  async findUnpurchasedProducts(): Promise<ProductResponse[]> {
    const query: string = `select p.code, p.name, p.description, p.iva, p.stock, p.public_price as "publicPrice", p.supplier_price as "supplierPrice", pc.name as "categoryName", pc.description as "categoryDescription" 
    from product p inner join productcategory pc on p.id_category = pc.name right join cartitem c on c.code_product = null;`;
    const products: ProductResponseSQL[] = await this.postgresSQLService.query(
      query
    );

    let productResponse: ProductResponse[] = [];
    if (products.length > 0) {
      Array.from(products).forEach((p) => {
        productResponse.push({
          code: p.code,
          name: p.name,
          description: p.description,
          iva: Number(p.iva),
          category: {
            name: p.categoryName,
            description: p.categoryDescription
          },
          stock: Number(p.stock),
          publicPrice: Number(p.publicPrice),
          supplierPrice: Number(p.supplierPrice)
        });
      });
    }
    return productResponse;
  }

  async createProduct(
    productModel: ProductModel
  ): Promise<ProductResponse | null> {
    const query = `
      INSERT INTO Product (
        code, name, description, iva, id_category, stock, public_price, supplier_price
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const result = await this.postgresSQLService.query<ProductResponseSQL>(
      query,
      [
        productModel.getCode(),
        productModel.getName(),
        productModel.getDescription(),
        productModel.getIva(),
        productModel.getCategory().getName(),
        productModel.getStock(),
        productModel.getPublicPrice(),
        productModel.getSupplierPrice()
      ]
    );

    if (result.length > 0) {
      return ProductAdapter.productModelToProductResponse(productModel);
    }

    return null;
  }

  async updateProduct(
    code: string,
    productModel: ProductModel
  ): Promise<ProductResponse | null> {
    const query: string = `
    UPDATE Product
    SET code = $1, 
        name = $2, 
        description = $3, 
        iva = $4, 
        id_category = $5, 
        stock = $6, 
        public_price = $7, 
        supplier_price = $8
    WHERE code = $9
    RETURNING *;
  `;

    const result = await this.postgresSQLService.query<ProductResponseSQL>(
      query,
      [
        productModel.getCode(),
        productModel.getName(),
        productModel.getDescription(),
        productModel.getIva(),
        productModel.getCategory().getName(),
        productModel.getStock(),
        productModel.getPublicPrice(),
        productModel.getSupplierPrice(),
        code
      ]
    );

    if (result.length > 0) {
      return ProductAdapter.productModelToProductResponse(productModel);
    }
    return null;
  }
}
