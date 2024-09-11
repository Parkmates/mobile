import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AdsComponents = () => {
  return (
    <TouchableOpacity style={styles.containerEmpty}>
      <Image
        source={{
          uri: "https://th.bing.com/th/id/OIP.AJo7SZwAyt82Wua1XLeANgHaE8?rs=1&pid=ImgDetMain",
        }}
        style={{ width: '100%', height: 250, borderRadius: 10 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default AdsComponents;

const styles = StyleSheet.create({
  containerEmpty: {
    width: "100%",
    backgroundColor: "#e2e2e2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 250,
  },
});
