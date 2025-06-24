import { DatabaseServiceSQLServer } from '../../../../../../database/sqlserver/service/sqlserver.service';
import { ProductResponseSQL } from '../../../../../../shared/interfaces/product.response.interface';
import { InterfaceProductRepository } from '../../../../domain/contracts/product.repository.interface';
import { ProductResponse } from '../../../../domain/schemas/dto/response/product.response';
import { ProductModel } from '../../../../domain/schemas/model/product.model';
import { ProductAdapter } from '../../../adapters/product.adapter';

export class ProductRepositorySQLImplementation
  implements InterfaceProductRepository
{
  constructor(private readonly sqlService: DatabaseServiceSQLServer) {}

  async findAllProducts(): Promise<ProductResponse[]> {
    const products: ProductResponseSQL[] = await this.sqlService.query(
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
      WHERE p.code = @code;
    `;

    const product = await this.sqlService.query<ProductResponseSQL>(query, {
      code: code
    });

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
    const products: ProductResponseSQL[] = await this.sqlService.query(query);

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
from product p inner join productcategory pc on p.id_category = pc.name and pc.name = @categoryName;`;

    const products: ProductResponseSQL[] = await this.sqlService.query(query, {
      categoryName: categoryName
    });

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
from product p inner join productcategory pc on p.id_category = pc.name and p.stock between @startStock and @endStock;`;
    const products: ProductResponseSQL[] = await this.sqlService.query(query, {
      startStock: startStock,
      endStock: endStock
    });

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
    const products: ProductResponseSQL[] = await this.sqlService.query(query);

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
    const products: ProductResponseSQL[] = await this.sqlService.query(query);

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
    VALUES (@code, @name, @description, @iva, @id_category, @stock, @public_price, @supplier_price);
    SELECT * FROM Product WHERE code = @code;
  `;

    const result = await this.sqlService.query<ProductResponseSQL>(query, {
      code: productModel.getCode(),
      name: productModel.getName(),
      description: productModel.getDescription(),
      iva: productModel.getIva(),
      id_category: productModel.getCategory().getName(),
      stock: productModel.getStock(),
      public_price: productModel.getPublicPrice(),
      supplier_price: productModel.getSupplierPrice()
    });
    if (result.length > 0) {
      return ProductAdapter.productModelToProductResponse(productModel);
    }

    return null;
  }
  async updateProduct(
    code: string,
    productModel: ProductModel
  ): Promise<ProductResponse | null> {
    const query = `
      UPDATE Product
      SET 
        code = @code, 
        name = @name, 
        description = @description, 
        iva = @iva, 
        id_category = @id_category, 
        stock = @stock, 
        public_price = @public_price, 
        supplier_price = @supplier_price
      WHERE code = @original_code;
  
      SELECT * FROM Product WHERE code = @code;
    `;

    const result = await this.sqlService.query<ProductResponseSQL>(query, {
      code: productModel.getCode(),
      name: productModel.getName(),
      description: productModel.getDescription(),
      iva: productModel.getIva(),
      id_category: productModel.getCategory().getName(),
      stock: productModel.getStock(),
      public_price: productModel.getPublicPrice(),
      supplier_price: productModel.getSupplierPrice(),
      original_code: code
    });

    if (result.length > 0) {
      return ProductAdapter.productModelToProductResponse(productModel);
    }
    return null;
  }
}
