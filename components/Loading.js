import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ActivityIndicator size={"large"} color={"#007BFF"} />
        <Text style={{ color: '#fff' }}>Loading</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    height: height * 0.15,
    width: width * 0.3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
