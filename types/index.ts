import { DocumentPickerAsset } from "expo-document-picker";

export type UserRegister = {
    phone: string;
    password: string;
    confirmPassword: string;
}

export type UserSignIn = {
    phone: string;
    password: string;
}

export type UserType = {
    username: string;
    password: string;
    email: string;
    accountId: string;
    phone: string;
    avatar?: DocumentPickerAsset | null;
}