import { OrderItemRequest } from "./order-item.model"

export class Order {
  Id: number = 0
  OrderNo: number = 0
  PMethod: string = ''
  GTotal: number = 0
  CustomerId: number = 0
}

export interface CreateOrderRequest {
  orderNo: number,
  pMethod: string,
  gTotal: number,
  customerId: number,
  orderItems: OrderItemRequest[]
}
