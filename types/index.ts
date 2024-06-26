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
    user: User | null;
    type: string
}