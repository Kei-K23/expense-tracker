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

export type Budget = Models.Document & BudgetType

export type BudgetType = {
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
    name: string;
    description?: string;
    type: string;
    budgets: Budget | null;
    attachmentURL: string
    balance: number;
    category: string;
}

export type Transaction = Models.Document & TransactionType;

export type TransactionData = {
    name: string;
    description?: string;
    type: string;
    budgets: Budget | null;
    balance: number;
    attachmentURL: DocumentPickerAsset | null;
    category: string;
}