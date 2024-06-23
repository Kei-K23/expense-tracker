import { account } from "@/lib/appWrite";
import { ID } from "react-native-appwrite";

export const registerUserAccountWithPhoneNumber = async (phone: string) => {

    // If password does not match then return
    if (phone === "") {
        throw new Error("Phone number cannot be empty");
    }

    try {
        const token = await account.createPhoneToken(
            ID.unique(),
            phone.trim()
        );

        if (!token) throw new Error("Account cannot create");

        return token.userId;
    } catch (e: any) {
        // TODO delete log in production
        console.log(e);

        throw new Error("Something went wrong when sign up");
    }
}

export const accountVerification = async (code: string, userId: string) => {

    // If password does not match then return
    if (code === "" || userId === "") {
        throw new Error("Credentials cannot be empty");
    }

    try {
        const session = await account.createSession(
            userId,
            code
        );

        if (!session) throw new Error("Account cannot be verified");

        return session;
    } catch (e) {
        throw new Error("Something went wrong when account verification");
    }
}
