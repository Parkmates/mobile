import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Hr = ({ pad }) => {
  return (
    <View>
      <View style={{ marginTop: pad }} />
      <View style={{ height: 1, backgroundColor: "#222" }}></View>
      <View style={{ marginBottom: pad }}/>
    </View>
  );
};

export default Hr;

const styles = StyleSheet.create({});
