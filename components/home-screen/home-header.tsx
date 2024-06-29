import useCurrentMonth from "@/hooks/use-current-month";
import { UserData } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Badge from "./badge";

type HomeHeaderProps = {
  user: UserData;
  totalBalance: number;
};
export default function HomeHeader({ user, totalBalance }: HomeHeaderProps) {
  const month = useCurrentMonth();

  return (
    <View style={[styles.container]}>
      <View style={[styles.secondContainer]}>
        <Image
          style={[styles.avatar]}
          source={{
            uri: user?.avatar,
          }}
        />
        <Text>{month}</Text>
      </View>
      <Text>Account Balance</Text>
      <Text>{totalBalance}</Text>
      <View style={[styles.badgeContainer]}>
        <Badge title="Income" balance={user?.incomes!} iconColor="green" />
        <Badge title="Expense" balance={user?.expenses!} iconColor="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 20,
  },
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    overflow: "hidden",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
