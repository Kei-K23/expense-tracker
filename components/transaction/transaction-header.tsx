import { fontSize } from "@/constants/Style";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TransactionHeaderProps = {
  title: string;
  bgColor: string;
  balance: number;
  handleOnChange: (value: string) => void;
};
export default function TransactionHeader({
  title,
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
        <Text style={[styles.title]}>{title}</Text>
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
    fontSize: fontSize.textBold,
  },
  balance: {
    color: "#fff",
    fontSize: fontSize.headerExtraBold,
    fontWeight: "800",
  },
});
