import { account, appwriteConfig, avatars, databases } from "@/lib/appWrite";
import { ID, Query } from "react-native-appwrite";
import { uploadFile } from "./file-storage";
import { UserData, UserType } from "@/types";

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

export const createUserAccount = async ({ username, password, phone, email, accountId, avatar }: UserType) => {

    try {
        let userAvatar: string | URL | undefined;

        // If avatar is not null then upload to cloud storage and return url string
        if (avatar) {
            userAvatar = await uploadFile(avatar);
        } else {
            // Create default avatar with username if user not upload avatar
            userAvatar = avatars.getInitials(username);
        }

        // Create user account
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                username,
                password,
                email,
                accountId,
                phone,
                avatar: userAvatar
            }
        );

        return newUser;
    } catch (e) {
        console.log(e);
        throw new Error("Error while creating user account");
    }
}

export const getSignedInUser = async () => {
    try {
        return await account.get()
    } catch (e) {
        console.log(e);
        throw new Error("Error while getting sign in user");
    }
}

export const getUserById = async (id: string) => {
    try {
        // Query to get user account by id
        const data = await databases.listDocuments<UserData>(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal("accountId", id)
        ]);

        // Return first index of user document list
        return data.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error("Something went wrong when getting user");
    }
}

