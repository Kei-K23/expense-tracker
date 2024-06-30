import { keysForStorage } from "@/constants/Keys";
import { getUserById } from "@/db/user";
import { getStoreData } from "@/lib/async-storeage";
import { UserData } from "@/types";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

export default function useAuthUser() {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Get user account id from session that store in local storage
    (async () => {
      try {
        setLoading(true);
        // Get session information from local storage
        const session = await getStoreData<Models.Session>(
          keysForStorage.session
        );

        if (session) {
          // Get user account by id
          const userAccount = await getUserById(session.userId);

          setUser(userAccount);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, loading, error };
}
