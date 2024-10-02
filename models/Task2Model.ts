export interface Order {
  id: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

export interface BudgetPeriod {
  startDate: Date;
  endDate: Date;
  budget: number;
  totalAmount: number;
  orders: Order[];
}
