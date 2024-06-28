import { getSignedInUser, getUserById } from "@/db/user";
import { UserData } from "@/types";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Get user account id from session that store in local storage
    (async () => {
      try {
        setLoading(true);
        // Get signed in user account
        const singedUser = await getSignedInUser();

        if (singedUser) {
          // Get user account by id
          const userAccount = await getUserById(singedUser.$id);

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
