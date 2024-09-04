import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import TabBar from "./TabBar";
import BookPage from "../pages/BookPage";
import ListParkingPage from "../pages/ListParkingPage";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Park" tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Book"
        component={BookPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Park"
        component={ListParkingPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
