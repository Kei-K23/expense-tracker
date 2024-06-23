import HeroSectionCard from "@/components/welcome-screen/hero-section-card";
import Image from "@/constants/Image";
import { defaultStyles } from "@/constants/Style";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={[defaultStyles.layout]}>
      <HeroSectionCard
        image={Image.welcomeImg}
        title="Gain total control of your money"
        description="Become your own money manager and make every cent count"
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
