import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeSearchBar from "../components/SearchBar";
import CarouselBanner from "../components/CarouselBanner";
import HomeActiveBooking from "../components/HomeActiveBooking";
import BestSpotCard from "../components/BestSpotCard";
import AdsComponents from "../components/AdsComponents";
import * as SecureStore from 'expo-secure-store';
const HomePage = () => {
  // console.log(SecureStore.getItem('access_token'))
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeSearchBar />
      <CarouselBanner />
      <View style={styles.containerYourBooking}>
        <Text style={styles.yourBooking}>Your Booking</Text>
        <HomeActiveBooking />
      </View>
      <View style={styles.containerYourBooking}>
        <Text style={styles.yourBooking}>Best Parking Spot</Text>
        <View style={styles.bestContainer}>
          <BestSpotCard />
          <BestSpotCard />
          <BestSpotCard />
        </View>
      </View>
      <View style={styles.containerYourBooking}>
        <Text style={styles.yourBooking}>For You</Text>
        <View style={styles.bestContainer}>
          <AdsComponents />
        </View>
      </View>
      <View style={{ marginBottom: 60 }} />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  containerYourBooking: {
    padding: 18,
    // backgroundColor: 'red'
  },
  yourBooking: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  bestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItemsL: 'center',
    gap: 8
  }
});
