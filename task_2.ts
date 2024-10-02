// Senior Engineer Coding Challenge: Event-Driven Inventory and Budget Management

// Task 2: Order to Budget Period Mapping and Budget Validation
// Implement functions that handle order-to-budget period mapping and budget validation.
// Consider orders that may span multiple budget periods.

import { Order, BudgetPeriod } from "./models/Task2Model";

/**
 * Map Orders to budget period
 * @param orders
 * @param budgetPeriods
 * @returns
 */
export function mapOrdersToBudgetPeriods(
    orders: Order[],
    budgetPeriods: BudgetPeriod[]
): BudgetPeriod[] {
    // Handle orders that span multiple budget periods by splitting them appropriately

    // Create a copy of the budget periods to avoid modifying the original array
    const updatedBudgetPeriods = [...budgetPeriods];

    // Iterate through each order and assign it to the appropriate budget periods
    orders.forEach((order) => {
        // Find the budget periods that overlap with the order's duration
        const overlappingPeriods = updatedBudgetPeriods.filter((period) => {
            return (
                order.startDate <= period.endDate &&
                order.endDate >= period.startDate
            );
        });

        // Loop through each overlapping periods
        overlappingPeriods.forEach((period) => {
            const periodAmount = order.amount;

            // Update the period's total amount and orders array
            period.totalAmount += periodAmount;
            period.orders.push({ ...order, amount: periodAmount });
        });
    });

    return updatedBudgetPeriods;
}

/**
 * Validates order against budget
 * @param order 
 * @param budgetPeriods 
 * @returns {
      isValid: boolean;
      remainingBudget: number;
      exceededAmount: number;
  }
 */
export function validateOrderAgainstBudget(
    order: Order,
    budgetPeriods: BudgetPeriod[]
): {
    isValid: boolean;
    remainingBudget: number;
    exceededAmount: number;
} {
    // Consider orders that span multiple budget periods
    // Calculate remaining budget and exceeded amount if any

    // Throw error if order is undefined
    if (typeof order === "undefined") {
        throw new Error(`Something went wrong`);
    }

    // use the mapOrdersToBudgetPeriods to get budget periods
    const mappedBudgetPeriods = mapOrdersToBudgetPeriods(
        [order],
        budgetPeriods
    );

    // Find the budget period
    const period = mappedBudgetPeriods.find((f) => f.orders.length > 0);

    if (!period) {
        // Throw error if no order has budget period
        throw new Error(`Order doens't have budget period`);
    }

    // Set valid if budget - total amount is not equal to 0
    const isValid = period?.budget - period?.totalAmount > 0;

    // Calculate the remaining budget for the period
    const remaining = period?.budget - period?.totalAmount;
    const remainingBudget = remaining > 0 ? remaining : 0;

    // Calculate the exceeded budget for the period
    const exceeded = period?.totalAmount - period?.budget;
    const exceededAmount = exceeded > 0 ? exceeded : 0;

    return {
        isValid,
        remainingBudget,
        exceededAmount,
    };
}

/**
 * Returns remaining budget
 * @param date
 * @param budgetPeriods
 * @returns number
 */
export function getRemainingBudget(
    date: Date,
    budgetPeriods: BudgetPeriod[]
): number {
    // Find the correct budget period and calculate the remaining budget

    // Find the budget period that includes the given date
    const period = budgetPeriods.find((period) => {
        return date >= period.startDate && date <= period.endDate;
    });

    // Return the remaining budget for that period
    return period ? period.budget - period.totalAmount : 0;
}

// Test data
export const testOrders: Order[] = [
    {
        id: "1",
        amount: 1000,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-20"),
    },
    {
        id: "2",
        amount: 2000,
        startDate: new Date("2024-01-25"),
        endDate: new Date("2024-02-05"),
    },
    {
        id: "3",
        amount: 1500,
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-02-15"),
    },
    {
        id: "4",
        amount: 3000,
        startDate: new Date("2024-02-20"),
        endDate: new Date("2024-03-10"),
    },
];

export const testBudgetPeriods: BudgetPeriod[] = [
    {
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
        budget: 5000,
        totalAmount: 0,
        orders: [],
    },
    {
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-29"),
        budget: 6000,
        totalAmount: 0,
        orders: [],
    },
    {
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-31"),
        budget: 7000,
        totalAmount: 0,
        orders: [],
    },
];

// console.log(mapOrdersToBudgetPeriods(testOrders, testBudgetPeriods));
// console.log(validateOrderAgainstBudget(testOrders[0], testBudgetPeriods));
// console.log(validateOrderAgainstBudget(testOrders[1], testBudgetPeriods));
// console.log(validateOrderAgainstBudget(testOrders[2], testBudgetPeriods));
// console.log(validateOrderAgainstBudget(testOrders[3], testBudgetPeriods));
// console.log(getRemainingBudget(new Date('2024-03-15'), testBudgetPeriods));
