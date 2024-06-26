import Button from "@/components/ui/button";
import HeroSectionCard from "@/components/welcome-screen/hero-section-card";
import Image from "@/constants/Image";
import { defaultStyles } from "@/constants/Style";
import useRedirectScreen from "@/hooks/use-redirect-screen";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";

export default function WelcomeScreen() {
  // Custom hook to redirect screens for account setup process
  useRedirectScreen();

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
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
