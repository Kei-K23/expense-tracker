import ProfileActionsContainer from "@/components/profile-screen/profile-actions-container";
import ProfileSection from "@/components/profile-screen/profile-section";
import { defaultStyles } from "@/constants/Style";
import useAuthUser from "@/hooks/use-auth-user";
import React from "react";
import { SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const { user, loading } = useAuthUser();
  return (
    <SafeAreaView style={defaultStyles.layout}>
      <ProfileSection user={user!} loading={loading} />
      <ProfileActionsContainer />
    </SafeAreaView>
  );
}
