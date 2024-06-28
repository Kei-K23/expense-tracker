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
    <SkeletonContent
      isLoading={loading}
      layout={[
        { key: "1", style: styles.avatar },
        {
          key: "1",
          style: {
            width: 120,
            height: 20,
          },
        },
      ]}
    >
      <Image
        style={[styles.avatar]}
        source={{
          uri: user?.avatar,
        }}
      />
      <Text>{user?.username}</Text>
    </SkeletonContent>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
});
