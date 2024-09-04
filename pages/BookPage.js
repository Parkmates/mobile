import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeActiveBooking from "../components/HomeActiveBooking";
import ParkingHistory from "../components/ParkingHistory";

const BookPage = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerActive}>
        <Text style={styles.yourBooking}>Your Booking</Text>
        <HomeActiveBooking />
      </View>
      <Text style={[styles.yourBooking, { marginTop: 24, paddingHorizontal: 24 }]}>
        Booking History
      </Text>
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <ParkingHistory />
      <View style={{ marginBottom: 120 }} />
    </ScrollView>
  );
};

export default BookPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
  },
  yourBooking: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  containerActive: {
    paddingHorizontal: 24
  }
});
