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

export const getBudgetById = async (id: string) => {
    try {
        // Query to get all wallets by user id
        const data = await databases.getDocument<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, id);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budget by id");
    }
}

export const deleteBudgetById = async (id: string) => {
    try {
        //! Check the need to first check the budget is exist before deleting

        // Delete the budget by id
        await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, id);
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when deleting budget by id");
    }
}

// Get all budgets by user id and month
export const getAllBudgetsByUserIdAndMonth = async (userId: string, createdMonth: string) => {
    try {
        // Query to get all budgets by user id and month
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("users", userId),
            Query.equal("createdMonth", createdMonth),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id and created month");
    }
}

// Get all budgets by budget name and month
export const getAllBudgetsByNameAndMonth = async (name: string, createdMonth: string) => {
    try {
        // Query to get all budgets by user id and month
        const data = await databases.listDocuments<Budget>(appwriteConfig.databaseId, appwriteConfig.budgetCollectionId, [
            Query.equal("name", name),
            Query.equal("createdMonth", createdMonth),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting budgets by user id and created month");
    }
}

export const createBudget = async ({ name, user, createdMonth, limitedAmount, receiveAlert, color }: BudgetType) => {
    if (!user) {
        throw new Error("Cannot create budget. User id is missing");
    }

    // Check if budget with the same name and month already exists
    const data = await getAllBudgetsByNameAndMonth(name, createdMonth)
    if (data.documents.length > 0) {
        throw new Error("Cannot create budget. Budget with the same name already exists for this month");
    }
    try {

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
                color: color
            }
        );

        return newBudget;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when creating budget");
    }
}

