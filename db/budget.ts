import { appwriteConfig, databases } from "@/lib/appWrite";
import { ID, Query } from "react-native-appwrite";
import { BudgetType, User } from "@/types";

export const getAllBudgetByUser = async (userId: string) => {
    try {
        // Query to get all budgets by user id
        const data = await databases.listDocuments<User>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("user", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id");
    }
}

export const createBudget = async ({ name, balance, type, user }: BudgetType) => {
    try {
        // Create new budget for user
        const newBudget = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.budgetCollectionId,
            ID.unique(),
            {
                name: name.trim(),
                balance,
                type: type.trim(),
                user,
            }
        );

        return newBudget;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when creating budgets");
    }
}

