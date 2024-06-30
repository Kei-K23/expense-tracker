import { colors } from "@/constants/Colors";
import { fontSize } from "@/constants/Style";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "@/components/action-sheet/sheet";
import { PaperProvider } from "react-native-paper";

export default function TabsLayout() {
  return (
    <PaperProvider>
      <SheetProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: colors.primary[100],
            tabBarStyle: {
              backgroundColor: "#fff",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              height: 64,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <>
                  <Ionicons name={"home"} size={25} color={color} />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: color,
                      },
                    ]}
                  >
                    Home
                  </Text>
                </>
              ),
            }}
          />
          <Tabs.Screen
            name="transaction"
            options={{
              title: "Transaction",
              tabBarIcon: ({ color }) => (
                <>
                  <Ionicons name={"trail-sign"} size={25} color={color} />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: color,
                      },
                    ]}
                  >
                    Transaction
                  </Text>
                </>
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarButton: () => (
                <TouchableOpacity
                  style={[styles.actionBtnContainer]}
                  onPress={() => {
                    SheetManager.show("create-transaction");
                  }}
                >
                  <View style={[styles.textContainer]}>
                    <Ionicons
                      name="add"
                      size={25}
                      color={colors.primary[100]}
                    />
                    <Text style={[styles.text, { color: colors.primary[100] }]}>
                      Create
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
          />
          <Tabs.Screen
            name="budget"
            options={{
              title: "Budget",
              tabBarIcon: ({ color }) => (
                <>
                  <Ionicons name={"pie-chart"} size={25} color={color} />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: color,
                      },
                    ]}
                  >
                    Budget
                  </Text>
                </>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <>
                  <Ionicons name={"person"} size={25} color={color} />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: color,
                      },
                    ]}
                  >
                    Profile
                  </Text>
                </>
              ),
            }}
          />
        </Tabs>
      </SheetProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.gray[400],
    fontSize: fontSize.textTiny,
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnContainer: {
    marginTop: 12.3,
    marginHorizontal: 15,
  },
});
