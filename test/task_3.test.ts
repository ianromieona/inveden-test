import { handler } from "../task_3";

describe("Task 3: Serverless Function", () => {
    it("should return all inventory items", async () => {
        const event = {}; // Replace with your API Gateway event structure

        const response = await handler(event);

        const { statusCode, data: inventoryItems } = response;

        expect(statusCode).toBe(200);
        expect(inventoryItems).toBeDefined();
        expect(inventoryItems.length).toBe(3);
    });
});
