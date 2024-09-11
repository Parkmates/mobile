import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Star } from "react-native-feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const BestSpotCard = ({ name, img, address, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: img,
        }}
        height={120}
        width={"100%"}
        resizeMode="cover"
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <Text style={styles.address} numberOfLines={3}>
          {address}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="black" />
          <Text style={styles.ratingNumber}>4.8</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BestSpotCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e2e2",
    flex: 1,
    borderRadius: 10,
  },
  detailContainer: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontWeight: "400",
    fontSize: 12,
  },
  address: {
    fontSize: 10,
    color: "#737373",
  },
  ratingContainer: {
    marginTop: 4,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 12,
  },
});
