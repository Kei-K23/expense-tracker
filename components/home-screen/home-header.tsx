import { UserData } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Badge from "./badge";
import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import useMonth from "@/hooks/use-current-month";

type HomeHeaderProps = {
  user: UserData;
  totalBalance: number;
};
export default function HomeHeader({ user, totalBalance }: HomeHeaderProps) {
  const { currentMonth } = useMonth();

  return (
    <View style={[styles.container]}>
      <View style={[styles.secondContainer]}>
        <Image
          style={[styles.avatar]}
          source={{
            uri: user?.avatar,
          }}
        />
        <Text style={[styles.month]}>{currentMonth}</Text>
      </View>
      <Text style={[styles.accountBalance]}>Account Balance</Text>
      <Text style={[styles.totalBalance]}>${totalBalance || 0}</Text>
      <View style={[styles.badgeContainer]}>
        <Badge
          title="Income"
          balance={user?.incomes!}
          iconColor={colors.green[100]}
        />
        <Badge
          title="Expense"
          balance={user?.expenses!}
          iconColor={colors.danger[300]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: colors.milk[100],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
    marginTop: 15,
  },
  accountBalance: {
    textAlign: "center",
    color: colors.gray[300],
    marginBottom: 5,
  },
  totalBalance: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: fontSize.headerSmallBold,
  },
  month: {
    fontSize: fontSize.textBold,
    fontWeight: "700",
  },
});
