import { useEffect } from "react";
import { getAllBudgetByUser } from "@/db/budget";
import { getSignedInUser, getUserById } from "@/db/user";
import { getStoreData } from "@/lib/async-storeage";
import { keysForStorage } from "@/constants/Keys";
import { Models } from "react-native-appwrite";
import { router } from "expo-router";

export default function useRedirectScreen() {
  // Check session exist and active
  useEffect(() => {
    const fetchData = async () => {
      try {
        const singedUser = await getSignedInUser();
        const userAccount = await getUserById(singedUser.$id);

        const [session, budgets] = await Promise.all([
          getStoreData<Models.Session>(keysForStorage.session),
          getAllBudgetByUser(userAccount.$id),
        ]);

        // Check session exist
        if (session) {
          // Check session have expire date
          if (session?.expire) {
            const expirationDate = new Date(session.expire);
            const now = new Date();
            // Check session is active
            if (expirationDate > now) {
              console.log("Session is active.");
              // If user account is already created
              // Navigate to setup budget screen
              if (userAccount) {
                // Check budgets exist
                // If has existing budget then navigate to main home screen
                if (budgets.total > 0) {
                  router.push("/home");
                } else {
                  // Navigate to initial setup budget for user account
                  router.push("/setup-budget");
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
        router.push("/");
      }
    };

    fetchData();
  }, []);
}
