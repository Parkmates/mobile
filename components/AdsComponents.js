import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AdsComponents = () => {
  return (
    <TouchableOpacity style={styles.containerEmpty}>
      <Text>For Ads</Text>
    </TouchableOpacity>
  );
};

export default AdsComponents;

const styles = StyleSheet.create({
  containerEmpty: {
    width: '100%',
    backgroundColor: "#e2e2e2",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 190,
  },
});
