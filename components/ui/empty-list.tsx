import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyListProps = {
  title: string;
  description?: string;
};

export default function EmptyList({ title, description }: EmptyListProps) {
  return (
    <View>
      <Text style={[styles.title]}>{title}</Text>
      <Text style={[styles.description]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.text,
    fontWeight: "bold",
    color: colors.gray[300],
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: fontSize.textSmall,
    fontWeight: "bold",
    color: colors.gray[300],
    textAlign: "center",
  },
});
