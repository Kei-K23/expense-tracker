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
      <Text>How much?</Text>
      <Text>{balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
