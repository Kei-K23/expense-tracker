import { Account, Avatars, Client, Databases, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_ENDPOINT!,
    platform: process.env.EXPO_PUBLIC_PLATFORM!,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    storageId: process.env.EXPO_PUBLIC_STORAGE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
    walletCollectionId: process.env.EXPO_PUBLIC_WALLET_COLLECTION_ID!,
    transactionCollectionId: process.env.EXPO_PUBLIC_TRANSACTION_COLLECTION_ID!,
    budgetCollectionId: process.env.EXPO_PUBLIC_BUDGET_COLLECTION_ID!,
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storages = new Storage(client);
