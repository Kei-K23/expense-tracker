import { UserData } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SkeletonContent from "@/components/ui/skeleton-content";
import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";

type ProfileSectionProps = {
  user: UserData;
  loading: boolean;
};
export default function ProfileSection({ user, loading }: ProfileSectionProps) {
  return (
    <SkeletonContent containerStyle={styles.container} isLoading={loading}>
      <Image
        style={[styles.avatar]}
        source={{
          uri: user?.avatar,
        }}
      />
      <View>
        <Text aria-ignore={true} style={styles.username}>
          Username
        </Text>
        <Text style={styles.name}>{user?.username}</Text>
      </View>
    </SkeletonContent>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
  },
  name: {
    width: 70,
    height: 20,
    fontSize: fontSize.headerTiny,
    fontWeight: "800",
  },
  username: {
    color: colors.gray[300],
    marginBottom: 5,
  },
});
