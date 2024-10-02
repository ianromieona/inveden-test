import { BudgetPeriod } from "../models/Task2Model";
import {
    testOrders,
    testBudgetPeriods,
    mapOrdersToBudgetPeriods,
    validateOrderAgainstBudget,
    getRemainingBudget,
} from "../task_2";

describe("Task 2 test", () => {
    describe("mapOrdersToBudgetPeriods", () => {
        it("maps orders spanning multiple periods", () => {
            const orders = testOrders;

            const updatedBudgetPeriods = mapOrdersToBudgetPeriods(
                orders,
                testBudgetPeriods
            );

            expect(updatedBudgetPeriods[0].orders.length).toBe(2);
            expect(updatedBudgetPeriods[1].orders.length).toBe(3);
            expect(updatedBudgetPeriods[2].orders.length).toBe(1);
        });

        it("maps orders exactly on period boundaries", () => {
            const order = testOrders[0];

            const updatedBudgetPeriods = mapOrdersToBudgetPeriods(
                [order],
                testBudgetPeriods
            );

            const isPeriodWithin = (
                orderStartDate,
                orderEndDate,
                periodStartDate,
                periodEndDate
            ) => {
                return (
                    orderStartDate >= periodStartDate &&
                    orderEndDate <= periodEndDate
                );
            };

            expect(
                isPeriodWithin(
                    order?.startDate,
                    order?.endDate,
                    updatedBudgetPeriods[0]?.startDate,
                    updatedBudgetPeriods[0]?.endDate
                )
            ).toBe(true);
        });
    });

    describe("validateOrderAgainstBudget", () => {
        it("validates order within budget", () => {
            const order = testOrders[1];
            const budgetPeriods = [
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
            const validationResult = validateOrderAgainstBudget(
                order,
                budgetPeriods
            );

            expect(validationResult.isValid).toBe(true);
            expect(validationResult.remainingBudget).toBeGreaterThan(0);
            expect(validationResult.exceededAmount).toBe(0);
        });

        it("validates order exceeding budget", () => {
            const budgetPeriods = [
                {
                    startDate: new Date("2024-01-01"),
                    endDate: new Date("2024-01-31"),
                    budget: 1000,
                    totalAmount: 0,
                    orders: [],
                },
            ];
            const order = {
                id: "1",
                amount: 2000,
                startDate: new Date("2024-01-15"),
                endDate: new Date("2024-01-20"),
            };

            const validationResult = validateOrderAgainstBudget(
                order,
                budgetPeriods
            );

            expect(validationResult.isValid).toBe(false);
            expect(validationResult.remainingBudget).toEqual(0);
            expect(validationResult.exceededAmount).toBeGreaterThan(0);
        });

        it("throws error for undefined order", () => {
            expect(() =>
                validateOrderAgainstBudget(undefined, testBudgetPeriods)
            ).toThrowError();
        });
    });

    describe("getRemainingBudget", () => {
        it("returns 0 for a date outside all periods", () => {
            const date = new Date("2024-04-01");

            const remainingBudget = getRemainingBudget(date, testBudgetPeriods);

            expect(remainingBudget).toBe(0);
        });

        it("calculates remaining budget for a date within a period", () => {
            const date = new Date("2024-01-20");

            const remainingBudget = getRemainingBudget(date, testBudgetPeriods);

            expect(remainingBudget).toBe(1000);
        });
    });
});
