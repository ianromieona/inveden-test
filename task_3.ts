// Senior Engineer Coding Challenge: Event-Driven Inventory and Budget Management

// Task 3: Serverless Function
// Write a simple AWS Lambda function that could be triggered by an API Gateway event
// to retrieve the current inventory state.

// TODO: Implement this Lambda function
import { InventoryItem } from "./models/Task1Model";

const inventoryData: InventoryItem[] = [
    { id: "1", name: "Colgate", quantity: 50 },
    { id: "2", name: "Happy", quantity: 30 },
    { id: "3", name: "Close Up", quantity: 20 },
];

export const handler = async (event: any): Promise<any> => {
    try {
        // Get inventory items
        const inventoryItems = Array.from(inventoryData.values());

        // Send data
        return {
            statusCode: 200,
            data: inventoryItems,
        };
    } catch (error) {
        console.error("Error retrieving inventory:", error);
        // Send data
        return {
            statusCode: 500,
            message: "Error retrieving inventory",
        };
    }
};
