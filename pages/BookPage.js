import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeActiveBooking from "../components/HomeActiveBooking";
import ParkingHistory from "../components/ParkingHistory";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

const BookPage = ({ navigation }) => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getBooking = async () => {
    setLoading(true);
    try {
      const { data } = await api({
        url: "/api/trx",
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      const active = await data.filter(
        (e) =>
          e.status !== "checkoutSuccessfull" &&
          e.status !== "failed" &&
          e.status !== "cancelled"
      );

      const his = await data.filter(
        (e) =>
          e.status === "checkoutSuccessfull" ||
          e.status === "failed" ||
          e.status === "cancelled"
      );

      setBooking(active);
      setHistory(his);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Errror",
        text2: error.response.data.msg,
      });
      console.log(error.response.data);
      console.log(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getBooking();
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      getBooking();
    }, [])
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.containerActive}>
        <Text style={styles.yourBooking}>Your Booking</Text>
        {booking.length > 0 && (
          <HomeActiveBooking
            img={booking[0]?.parkingSpot?.imgUrl[0]}
            name={booking[0]?.parkingSpot?.name}
            status={booking[0]?.status}
            until={booking[0]?.createdAt}
            type={booking[0]?.spotDetail.type}
            isLoading={loading}
            onPress={() =>
              navigation.navigate("BookingDetail", {
                transactionId: booking[0]._id,
              })
            }
          />
        )}
        {booking.length === 0 && (
          <HomeActiveBooking
            isEmpyt={true}
            isLoading={loading}
            onPress={() => navigation.navigate("Park")}
          />
        )}
      </View>
      <Text
        style={[styles.yourBooking, { marginTop: 24, paddingHorizontal: 24 }]}
      >
        Booking History
      </Text>
      {history.map((e) => {
        return (
          <ParkingHistory
            key={e._id}
            name={e.parkingSpot.name}
            type={e.spotDetail.type}
            time={e.createdAt}
            book={e.bookingFee}
            pay={e.paymentFee}
            status={e.status}
          />
        );
      })}
      {history.length === 0 && (
        <View>
          <Text
            style={{
              color: "#6C757D",
              textAlign: "center",
              fontWeight: "700",
              marginTop: 30,
            }}
          >
            Empty.
          </Text>
        </View>
      )}
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
    paddingHorizontal: 24,
  },
});
