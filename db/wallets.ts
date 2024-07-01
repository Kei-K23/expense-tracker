import { appwriteConfig, databases } from "@/lib/appWrite";
import { ID, Query } from "react-native-appwrite";
import { TransferType, Wallet, WalletType } from "@/types";

export const getAllWalletByUser = async (userId: string) => {
    try {
        // Query to get all wallets by user id
        const data = await databases.listDocuments<Wallet>(appwriteConfig.databaseId, appwriteConfig.walletCollectionId, [
            Query.equal("user", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting wallets by user id");
    }
}

// Get total balance according to wallet collection that have in user by user id
export const getTotalBalanceOfWalletsByUserId = async (userId: string) => {
    try {
        // Query to get all wallets by user id
        const data = await databases.listDocuments<Wallet>(appwriteConfig.databaseId, appwriteConfig.walletCollectionId, [
            Query.equal("user", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return data.documents.reduce((acc, cur) => acc += cur.balance, 0);
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting wallets by user id to calculate total balance");
    }
}

export const getWalletById = async (id: string) => {
    try {
        // Query to get all wallets by user id
        const data = await databases.getDocument<Wallet>(appwriteConfig.databaseId, appwriteConfig.walletCollectionId, id);

        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting wallets by id");
    }
}

//! Must TODO : Change balance type to work with float data types
export const createWallet = async ({ name, balance, type, user }: WalletType) => {
    try {
        if (!user?.$id) {
            throw new Error("Cannot create wallet. User id is missing");
        }
        // Create new wallet for user
        const newWallet = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.walletCollectionId,
            ID.unique(),
            {
                name: name.trim(),
                balance: +balance,
                type: type.trim(),
                user: user?.$id,
            }
        );

        return newWallet;
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when creating wallets");
    }
}

export const transferBalancesBetweenWallets = async ({ fromValue, toValue, balance }: TransferType) => {
    try {

        // Get the wallet by its id to check waller is actually exist
        const fromWallet = await getWalletById(fromValue);
        const toWallet = await getWalletById(toValue);
        if (!toWallet || !fromWallet) {
            throw new Error("Wallet not found");
        }

        // Check subtract balances is less than from wallet balance, if not throw an error
        if (fromWallet.balance < balance) {
            throw new Error("Insufficient balance to transfer");
        }

        // Create balance transfer between from wallet and to wallet
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.walletCollectionId,
            fromValue,
            {
                balance: fromWallet.balance - balance,
            }
        );
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.walletCollectionId,
            toValue,
            {
                balance: toWallet.balance + balance,
            }
        );

    } catch (e: any) {
        console.log(e);
        throw new Error(e.message);
    }
}

