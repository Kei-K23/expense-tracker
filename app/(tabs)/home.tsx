import HomeHeader from "@/components/home-screen/home-header";
import { defaultStyles } from "@/constants/Style";
import { getTotalBalanceOfBudgetsByUserId } from "@/db/budget";
import useAuthUser from "@/hooks/use-auth-user";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  const [totalBalance, setTotalBalance] = useState<number>();
  const { user } = useAuthUser();

  useEffect(() => {
    (async () => {
      const totalBalanceData = await getTotalBalanceOfBudgetsByUserId(
        user?.$id!
      );
      setTotalBalance(totalBalanceData ?? 0);
    })();
  }, []);

  return (
    <SafeAreaView style={defaultStyles.layout}>
      <HomeHeader user={user!} totalBalance={totalBalance!} />
    </SafeAreaView>
  );
}
