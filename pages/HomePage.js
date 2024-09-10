import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeSearchBar from "../components/SearchBar";
import CarouselBanner from "../components/CarouselBanner";
import HomeActiveBooking from "../components/HomeActiveBooking";
import BestSpotCard from "../components/BestSpotCard";
import AdsComponents from "../components/AdsComponents";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import DataBanner from "../datas/DataBanner";
import Toast from "react-native-toast-message";
import { api } from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
const HomePage = ({ navigation }) => {
  // console.log(SecureStore.getItem('access_token'))
  const [bestSpot, setBestSpot] = useState([]);
  const [booking, setBooking] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true)
  const getBestSpot = async () => {
    try {
      const { data } = await api({
        url: "/api/parkspot/best",
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setBestSpot(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Errror",
        text2: error.response.data.msg,
      });
      console.log(error.response.data);
    }
  };

  const getBooking = async () => {
    try {
      const { data } = await api({
        url: "/api/trx",
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      const active = await data.filter(
        (e) => e.status !== "checkoutSuccessfull" && e.status !== "failed" && e.status !== "cancelled"
      );
      setBooking(active);
      setIsGettingData(false)
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Errror",
        text2: error.response.data.msg,
      });
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      getBooking();
    });
    getBooking();
    getBestSpot();
  }, [navigation]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeSearchBar
        onPressSearch={() => navigation.navigate("Park")}
        onPressProfile={() => navigation.navigate("Profile")}
      />
      <CarouselBanner data={DataBanner} />
      <View style={styles.containerYourBooking}>
        <Text style={styles.yourBooking}>Your Booking</Text>
        {booking.length > 0 && (
          <HomeActiveBooking
            img={booking[0]?.parkingSpot?.imgUrl[0]}
            name={booking[0]?.parkingSpot?.name}
            status={booking[0]?.status}
            until={booking[0]?.createdAt}
            type={booking[0]?.spotDetail.type}
            isLoading={isGettingData}
            onPress={() => navigation.navigate("BookingDetail", { transactionId: booking[0]._id })}
          />
        )}
        {booking.length === 0 && (
          <HomeActiveBooking
            isEmpyt={true}
            isLoading={isGettingData}
            onPress={() => navigation.navigate("Park")}
          />
        )}
      </View>
      <View style={styles.containerYourBooking}>
        <View style={styles.titleWrapper}>
          <Text style={styles.yourBooking}>Best Parking Spot</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Park")}>
            <Text style={styles.SeeMore}>See More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bestContainer}>
          {bestSpot.map((e) => {
            return (
              <BestSpotCard
                key={e._id}
                name={e.name}
                img={e.imgUrl[0]}
                address={e.address}
                onPress={() =>
                  navigation.navigate("DetailParking", { id: e._id })
                }
              />
            );
          })}
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
  SeeMore: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "600",
    marginBottom: 8,
  },
  bestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItemsL: "center",
    gap: 8,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
