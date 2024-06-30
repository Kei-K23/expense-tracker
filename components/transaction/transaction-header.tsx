import { fontSize } from "@/constants/Style";
import { TransactionData } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TransactionHeaderProps = {
  bgColor: string;
  balance: number;
  handleOnChange: (field: keyof TransactionData, value: string) => void;
};
export default function TransactionHeader({
  balance,
  bgColor,
  handleOnChange,
}: TransactionHeaderProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <View>
        <Text style={[styles.title]}>How much?</Text>
        <Text style={[styles.balance]}>${balance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
  },
  balance: {
    color: "#fff",
    fontSize: fontSize.headerBold,
    fontWeight: "800",
  },
});
