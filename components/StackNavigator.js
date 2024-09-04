import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import TabNavigator from "./TabNavigator";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DetailParkingSpot from "../pages/DetailParkingSpot";
import ConfirmationBookingPage from "../pages/ConfirmationBookingPage";
import PaymentPage from "../pages/PaymentPage";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator" options={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="DetailParking"
        component={DetailParkingSpot}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ConfirmationBooking"
        component={ConfirmationBookingPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentPage"
        component={PaymentPage}
      />
      {/* <Stack.Screen name='Profile' component={ProfilePage} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
