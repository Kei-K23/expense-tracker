import Button from "@/components/ui/button";
import HeroSectionCard from "@/components/welcome-screen/hero-section-card";
import Image from "@/constants/Image";
import { keysForStorage } from "@/constants/Keys";
import { defaultStyles } from "@/constants/Style";
import { getSignedInUser, getUserById } from "@/db/user";
import { getStoreData } from "@/lib/async-storeage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function WelcomeScreen() {
  // Check session exist and active

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singedUser = await getSignedInUser();

        const [session, userAccount] = await Promise.all([
          getStoreData<Models.Session>(keysForStorage.session),
          getUserById(singedUser.$id),
        ]);

        // Check session exist
        if (session) {
          // Check session have expire date
          if (session?.expire) {
            const expirationDate = new Date(session.expire);
            const now = new Date();
            // Check session is active
            if (expirationDate > now) {
              console.log("Session is active.");
              // If user account is already created
              // Navigate to setup budget screen
              if (userAccount) {
                router.push("/setup-budget");
              } else {
                // If user account is not created, then navigate to account setup screen
                router.push("/setup-user-account");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[defaultStyles.layout]}>
      <HeroSectionCard
        image={Image.welcomeImg}
        title="Gain total control of your money"
        description="Become your own money manager and make every cent count"
      />
      <View
        style={{
          marginTop: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Button
          title="Sign Up"
          variant="primary"
          callbackFn={() => {
            router.push("/sign-up");
          }}
        />
        <Button
          title="Login"
          variant="secondary"
          callbackFn={() => {
            router.push("/login");
          }}
        />
        <Button
          title="Login"
          variant="secondary"
          callbackFn={() => {
            router.push("/account-verify/2424234242-242424242");
          }}
        />
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
