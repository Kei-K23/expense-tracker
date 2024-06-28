import ProfileSection from "@/components/profile-screen/profile-section";
import { defaultStyles } from "@/constants/Style";
import useAuthUser from "@/hooks/use-auth-user";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const showAlert = useShowErrorAlert();
  const { user, loading } = useAuthUser();
  console.log(user);

  return (
    <SafeAreaView style={defaultStyles.layout}>
      <ProfileSection user={user!} loading={loading} />
    </SafeAreaView>
  );
}
