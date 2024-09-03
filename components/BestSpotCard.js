import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Star } from "react-native-feather";
import Ionicons from '@expo/vector-icons/Ionicons';

const BestSpotCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1724766409767-120f58295b83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        height={120}
        width={"100%"}
        resizeMode="cover"
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Central Park Mall GF</Text>
        <Text style={styles.address}>
          Parking Address Blablabla Blablabla Blablabla
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
  },
  title: {
    fontWeight: "400",
    fontSize: 16,
  },
  address: {
    fontSize: 12,
    color: "#737373",
  },
  ratingContainer: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  },
  ratingNumber: {
    fontSize: 12
  }
});
