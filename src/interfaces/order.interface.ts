export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
