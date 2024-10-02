import { v4 as uuidv4 } from "uuid";
import { InventoryEventHandler } from "../task_1";
import { InventoryItem, InventoryUpdateEvent } from "../models/Task1Model";

describe("Task 1 test", () => {
    let eventHandler: InventoryEventHandler;

    beforeEach(() => {
        eventHandler = new InventoryEventHandler();
    });

    it("should add an inventory item", () => {
        const item: InventoryItem = {
            id: uuidv4(),
            name: "Widget",
            quantity: 10,
        };
        eventHandler.handleInventoryAdd(item.id, item);

        const inventory = eventHandler.getInventory();
        expect(inventory).toHaveLength(1);
        expect(inventory[0]).toEqual(item);
    });

    it("should update an existing inventory item", () => {
        const item: InventoryItem = {
            id: uuidv4(),
            name: "Widget",
            quantity: 10,
        };
        eventHandler.handleInventoryAdd(item.id, item);

        const updateEvent: InventoryUpdateEvent = {
            itemId: item.id,
            quantityChange: 20,
        };
        eventHandler.handleInventoryUpdate(updateEvent);

        const inventory = eventHandler.getInventory();
        expect(inventory[0].quantity).toBe(20);
    });

    it("should throw an error if updating a non-existing inventory item", () => {
        const updateEvent: InventoryUpdateEvent = {
            itemId: "invalid-id",
            quantityChange: 5,
        };
        expect(() =>
            eventHandler.handleInventoryUpdate(updateEvent)
        ).toThrowError(`Object ID: invalid-id not found in inventory.`);
    });

    it("should get current inventory state", () => {
        const item1: InventoryItem = {
            id: uuidv4(),
            name: "Widget",
            quantity: 10,
        };

        eventHandler.handleInventoryAdd(item1.id, item1);

        const inventory = eventHandler.getInventory();
        expect(inventory).toEqual([item1]);
    });
});
