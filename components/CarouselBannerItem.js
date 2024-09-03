import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

const win = Dimensions.get("screen");

const CarouselBannerItem = ({ data, index }) => {
  return (
    <View>
      <Image
        source={{ uri: data.image }}
        resizeMode="cover"
        width={win.width}
        height={260}
      />
      {/* <Text>aa</Text> */}
    </View>
  );
};

export default CarouselBannerItem;

const styles = StyleSheet.create({});
