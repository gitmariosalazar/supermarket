export interface TotalSalesResponse {
  investment: number;
  totalIva: number;
  totalAmount: number;
  netProfit: number;
  totalOrders: number;
  totalItemsSold: number;
  dateRange?: {
    from: string;
    to: string;
  };
}
