import { UserData } from "@/types";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import SkeletonContent from "@/components/ui/skeleton-content";

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
      <Text aria-ignore={true}>Username</Text>
      <Text style={styles.name}>{user?.username}</Text>
    </SkeletonContent>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  },
});
