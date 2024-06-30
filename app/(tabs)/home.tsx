import HomeHeader from "@/components/home-screen/home-header";
import { keysForStorage } from "@/constants/Keys";
import { getTotalBalanceOfWalletsByUserId } from "@/db/wallets";
import useAuthUser from "@/hooks/use-auth-user";
import { getStoreData } from "@/lib/async-storeage";
import { UserData } from "@/types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  const [totalBalance, setTotalBalance] = useState<number>();
  const { user } = useAuthUser();

  useEffect(() => {
    (async () => {
      const session = await getStoreData(keysForStorage.session);

      if (!session) {
        // If session is not exist, then navigate to login screen
        router.push("/");
        return;
      }
      // Get user data from storage
      const storageUser = await getStoreData<UserData>(keysForStorage.user);

      const totalBalanceData = await getTotalBalanceOfWalletsByUserId(
        storageUser?.$id!
      );
      setTotalBalance(totalBalanceData);
    })();
  }, []);

  return (
    <SafeAreaView>
      <HomeHeader user={user!} totalBalance={totalBalance!} />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
