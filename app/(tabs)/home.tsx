import HomeHeader from "@/components/home-screen/home-header";
import { keysForStorage } from "@/constants/Keys";
import { getTotalBalanceOfBudgetsByUserId } from "@/db/budget";
import useAuthUser from "@/hooks/use-auth-user";
import { getStoreData } from "@/lib/async-storeage";
import { UserData } from "@/types";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  const [totalBalance, setTotalBalance] = useState<number>();
  const { user } = useAuthUser();

  useEffect(() => {
    (async () => {
      // Get user data from storage
      const storageUser = await getStoreData<UserData>(keysForStorage.user);
      const totalBalanceData = await getTotalBalanceOfBudgetsByUserId(
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
