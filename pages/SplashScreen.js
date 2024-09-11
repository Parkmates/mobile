import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import favicon from "../assets/favicon.png";
import logo from "../assets/logo.png";
import * as SecureStore from "expo-secure-store";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      if (!SecureStore.getItem("access_token")) {
        navigation.replace("Login");
      } else {
        navigation.replace("TabNavigator");
      }
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ width: '70%' }}>
        <Image source={logo} resizeMode="contain" style={{ flexShrink: 1, width: '100%' }} />
      </View>
      <ActivityIndicator
        size={"large"}
        color={"#007BFF"}
        style={{ marginTop: 0 }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
