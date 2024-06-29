import { appwriteConfig, databases } from "@/lib/appWrite";
import { ID, Query } from "react-native-appwrite";
import { Budget, BudgetType } from "@/types";

export const getAllBudgetByUser = async (userId: string) => {
    try {
        // Query to get all budgets by user id
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("user", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id");
    }
}

// Get total balance according to budget collection that have in user by user id
export const getTotalBalanceOfBudgetsByUserId = async (userId: string) => {
    try {
        // Query to get all budgets by user id
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("user", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data.documents.reduce((acc, cur) => acc += cur.balance, 0);
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id to calculate total balance");
    }
}

//! Must TODO : Change balance type to work with float data types
export const createBudget = async ({ name, balance, type, user }: BudgetType) => {
    try {
        if (!user?.$id) {
            throw new Error("Cannot create budget. User id is missing");
        }
        // Create new budget for user
        const newBudget = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            ID.unique(),
            {
                name: name.trim(),
                balance: +balance,
                type: type.trim(),
                user: user?.$id,
            }
        );

        return newBudget;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when creating budgets");
    }
}

