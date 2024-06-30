import { useEffect } from "react";
import { getAllWalletByUser } from "@/db/wallets";
import { getUserById } from "@/db/user";
import { getStoreData } from "@/lib/async-storeage";
import { keysForStorage } from "@/constants/Keys";
import { Models } from "react-native-appwrite";
import { router } from "expo-router";
import { account } from "@/lib/appWrite";

export default function useRedirectScreen() {
  // Check session exist and active
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageSessionData = await getStoreData<Models.Session>(
          keysForStorage.session
        );

        if (!storageSessionData) {
          return;
        }

        const userAccount = await getUserById(storageSessionData?.userId!);

        if (!userAccount) {
          return;
        }

        const budgets = await getAllWalletByUser(userAccount.$id);

        const session = await account.getSession(storageSessionData?.$id!);

        // Check session exist
        if (session) {
          // Check session have expire date
          if (session?.expire) {
            const expirationDate = new Date(session.expire);
            const now = new Date();
            // Check session is active
            if (expirationDate > now) {
              // If user account is already created
              // Navigate to setup budget screen
              if (userAccount) {
                // Check budgets exist
                // If has existing budget then navigate to main home screen
                if (budgets.documents.length > 0) {
                  router.push("/home");
                } else {
                  // Navigate to initial setup budget for user account
                  router.push("/setup-wallet");
                }
              } else {
                // If user account is not created, then navigate to account setup screen
                router.push("/setup-user-account");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return;
      }
    };

    fetchData();
  }, []);
}
