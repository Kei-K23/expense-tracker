import { appwriteConfig, databases } from "@/lib/appWrite";
import { ID, Query } from "react-native-appwrite";
import { Budget, BudgetType } from "@/types";

export const getAllBudgetsByUser = async (userId: string) => {
    try {
        // Query to get all wallets by user id
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("users", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id");
    }
}

// Get total balance according to wallet collection that have in user by user id
export const getAllBudgetsByUserIdAndMonth = async (userId: string, createdMonth: string) => {
    try {
        // Query to get all budgets by user id and month
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("users", userId),
            Query.equal("createdMonth", createdMonth),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id and created month");
    }
}

export const createBudget = async ({ name, user, createdMonth, limitedAmount, receiveAlert }: BudgetType) => {
    try {
        if (!user) {
            throw new Error("Cannot create budget. User id is missing");
        }
        // Create new budget for user
        const newBudget = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            ID.unique(),
            {
                name: name.trim(),
                limitedAmount: +limitedAmount,
                createdMonth: createdMonth,
                users: user,
                receiveAlert: receiveAlert,
            }
        );

        return newBudget;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when creating budget");
    }
}

