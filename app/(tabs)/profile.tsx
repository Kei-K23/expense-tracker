import ProfileActionsContainer from "@/components/profile-screen/profile-actions-container";
import ProfileHeader from "@/components/profile-screen/profile-header";
import { defaultStyles } from "@/constants/Style";
import useAuthUser from "@/hooks/use-auth-user";
import React from "react";
import { SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const { user, loading } = useAuthUser();
  return (
    <SafeAreaView style={defaultStyles.layout}>
      <ProfileHeader user={user!} loading={loading} />
      <ProfileActionsContainer />
    </SafeAreaView>
  );
}
