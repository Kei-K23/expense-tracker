import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { ProfileActionType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProfileActionItemProps = {
  action: ProfileActionType;
  isLoading: boolean;
};
export default function ProfileActionItem({
  action,
  isLoading,
}: ProfileActionItemProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      key={action.title}
      style={[
        styles.container,
        isLoading ? styles.containerGray : styles.containerWhite,
      ]}
      onPress={action.handler}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: action.iconContainerColor,
          },
        ]}
      >
        {/* TODO : check and implement type for icon */}
        {/* @ts-ignore */}
        <Ionicons name={action.icon} size={20} color={action.iconColor} />
      </View>
      <Text style={isLoading ? styles.textGray : styles.title}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[100],
    gap: 7,
  },
  containerWhite: {
    backgroundColor: "#fff",
  },
  containerGray: {
    backgroundColor: colors.gray[100],
  },
  iconContainer: {
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
  },
  title: {
    fontSize: fontSize.text,
    fontWeight: "600",
  },
  textGray: {
    fontSize: fontSize.text,
    fontWeight: "600",
    color: colors.gray[300],
  },
});
