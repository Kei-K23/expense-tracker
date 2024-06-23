import { account } from "@/lib/appWrite";
import { ID } from "react-native-appwrite";

export const createUser = async ({ phone, password, confirmPassword }: {
    phone: string;
    password: string;
    confirmPassword: string;
}) => {

    // If password does not match then return
    if (password !== confirmPassword) {
        throw new Error("Password doesn't not match");
    }

    try {
        const newAccount = await account.createPhoneToken(
            ID.unique(),
            phone!
        );

        if (!newAccount) throw new Error("Account cannot create");

        return newAccount;
    } catch (e: any) {
        // TODO delete log in production
        console.log(e);

        throw new Error("Something went wrong when sign up");
    }
}
