import Button from "@/components/ui/button";
import HeroSectionCard from "@/components/welcome-screen/hero-section-card";
import Image from "@/constants/Image";
import { defaultStyles } from "@/constants/Style";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View } from "react-native";

export default function WelcomeScreen() {
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
        <Button title="test" variant="primary" />
        <Button title="test" variant="secondary" />
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
