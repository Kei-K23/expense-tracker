import { UserData } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SkeletonLoader from "../ui/skeleton";

type ProfileSectionProps = {
  user: UserData;
  loading: boolean;
};
export default function ProfileSection({ user, loading }: ProfileSectionProps) {
  return (
    <View>
      {loading ? (
        <SkeletonLoader
          styles={{
            skeleton: styles.avatar,
          }}
        />
      ) : (
        <Image
          style={[styles.avatar]}
          source={{
            uri: user?.avatar,
          }}
        />
      )}
      {loading ? (
        <SkeletonLoader
          styles={{
            skeleton: {
              width: 120,
              height: 20,
            },
          }}
        />
      ) : (
        <Text>{user?.username}</Text>
      )}
    </View>
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
