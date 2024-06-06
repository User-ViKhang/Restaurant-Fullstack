export class OrderItem {
  Id: number = 0
  OrderId: number = 0
  ItemId: number = 0
  Quality: number = 0
  ItemName: string = ''
  Price: number = 0
  Total: number = 0
}

export interface OrderItemRequest {
  itemId: number,
  quality: number
}
