export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export interface InventoryUpdateEvent {
  itemId: string;
  quantityChange: number;
}
