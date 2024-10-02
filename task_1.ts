// Senior Engineer Coding Challenge: Event-Driven Inventory and Budget Management

// Task 1: Event-Driven Inventory Update
// Implement a simple event-driven system to handle inventory updates.
// Use TypeScript and follow domain-driven design principles.
import { InventoryItem, InventoryUpdateEvent } from "./models/Task1Model";

export class InventoryEventHandler {
    private inventory: Map<string, InventoryItem> = new Map();

    /**
     * Handles adding of inventory data
     * @param key
     * @param items
     */
    handleInventoryAdd(key: string, items: InventoryItem): void {
        this.inventory.set(key, items);
    }

    /**
     * Handle Inventory update
     * @param event
     */
    handleInventoryUpdate(event: InventoryUpdateEvent): void {
        const { itemId, quantityChange }: InventoryUpdateEvent = event;

        // Throw error if itemId is doesn't exist
        if (!this.inventory.has(itemId)) {
            throw new Error(`Object ID: ${itemId} not found in inventory.`);
        }

        // Get the value via id and update
        const existingObject = this.inventory.get(itemId)!;

        // Update the quantity and update Map value
        const updatedObject = { ...existingObject, quantity: quantityChange };
        this.inventory.set(itemId, updatedObject);
    }

    /**
     * Get Inventory
     * @returns InventoryItem[]
     */
    getInventory(): InventoryItem[] {
        return Array.from(this.inventory.values());
    }
}
