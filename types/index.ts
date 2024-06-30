import { DocumentPickerAsset } from "expo-document-picker";
import { Models } from "react-native-appwrite";

export type UserRegister = {
    phone: string;
    password: string;
    confirmPassword: string;
}

export type UserSignIn = {
    phone: string;
    password: string;
}

export type User = Models.Document & UserType

export type UserData = Models.Document & {
    username: string;
    password: string;
    email: string;
    accountId: string;
    phone: string;
    avatar: string;
    incomes?: number;
    expenses?: number;
}

export type UserType = {
    username: string;
    password: string;
    email: string;
    accountId: string;
    phone: string;
    avatar?: DocumentPickerAsset | null;
}

export type Wallet = Models.Document & WalletType

export type WalletType = {
    name: string;
    balance: number;
    user: UserData | null;
    type: string
}

export type ProfileActionType = {
    title: string;
    icon: string;
    handler: () => void;
    iconColor: string;
    iconContainerColor: string;
}

export type TransactionType = {
    description?: string;
    type: string;
    wallets: string;
    attachmentURL: string
    balance: number;
    category: string;
}

export type Transaction = Models.Document & TransactionType;

export type TransactionData = {
    description?: string;
    type: string;
    wallets: string;
    balance: number;
    attachmentURL: DocumentPickerAsset | null;
    category: string;
}

export type BudgetType = {
    name: string;
    limitedAmount: number;
    user: string;
    receiveAlert: boolean;
    createdMonth: string;
}

export type Budget = Models.Document & BudgetType;
