import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChevronLeft } from "react-native-feather";

const Header = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ChevronLeft color={"#000"} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View>
        <ChevronLeft />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  }
});
