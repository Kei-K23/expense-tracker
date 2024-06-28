import { ProfileActionType } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import ProfileActionItem from "./profile-action-item";
import { colors } from "@/constants/Colors";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { logoutUser } from "@/db/user";
import { getStoreData } from "@/lib/async-storeage";
import { keysForStorage } from "@/constants/Keys";
import { Models } from "react-native-appwrite";
import { router } from "expo-router";

export default function ProfileActionsContainer() {
  const showAlert = useShowErrorAlert();

  // Logout user handler
  const logoutHandler = async () => {
    try {
      // Get session from storage and logout user from Appwrite
      const session = await getStoreData<Models.Session>(
        keysForStorage.session
      );
      await logoutUser(session?.$id!);

      // Navigate to welcome screen
      router.push("/");
    } catch (e: any) {
      showAlert({
        message: e.message,
      });
    }
  };

  const actions: ProfileActionType[] = [
    {
      title: "Account",
      icon: "wallet",
      handler: () => {},
      iconColor: colors.primary[100],
      iconContainerColor: colors.primary[300],
    },
    {
      title: "Logout",
      icon: "log-out",
      handler: logoutHandler,
      iconColor: colors.danger[100],
      iconContainerColor: colors.danger[200],
    },
  ];
  return (
    <View style={[styles.container]}>
      {actions.map((action) => (
        <ProfileActionItem action={action} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
