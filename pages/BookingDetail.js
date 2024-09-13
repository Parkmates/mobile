import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import img1 from "../assets/12.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import Loading from "../components/Loading";
import Foundation from "@expo/vector-icons/Foundation";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCode from "react-native-qrcode-svg";
import { useFocusEffect } from "@react-navigation/native";

const BookingDetail = ({ navigation, route }) => {
  const { width } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [code, setCode] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  // const stat = transaction[0]?.status;
  const checkinTime = (time) => {
    let hour = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    let formatedHours = hour < 10 ? "0" + hour : hour;
    let formatedMinutes = minute < 10 ? "0" + minute : minute;

    return `${formatedHours}:${formatedMinutes}`;
  };

  const hourParking = (time) => {
    let now = new Date().getHours();
    let checkin = new Date(time).getHours();

    let nowMin = new Date().getMinutes();
    let checkinMin = new Date(time).getMinutes();

    let parkingHour = now - checkin;
    let parkingMin = nowMin - checkinMin;

    if (parkingMin > 0) {
      parkingHour = parkingHour + 1;
    }

    return parkingHour;
  };

  const dateFormat = (until) => {
    let date = new Date(until).toLocaleDateString("id-ID", {
      timeZone: "Asia/Bangkok",
      dayPeriod: "narrow",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let dateNumber = new Date(until).getDate();
    let hour = new Date(until).getHours() + 1;
    let minute = new Date(until).getMinutes();

    if (hour > 23 && minute > 0) {
      let newDate = new Date(until).setDate(new Date(until).getDate() + 2);
      date = new Date(newDate).toLocaleDateString("id-ID", {
        timeZone: "Asia/Bangkok",
        dayPeriod: "narrow",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      hour = hour - 24;
    }

    let formatedHours = hour < 10 ? "0" + hour : hour;
    let formatedMinutes = minute < 10 ? "0" + minute : minute;

    return `${formatedHours}:${formatedMinutes}, ${date}`;
  };

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api({
        url: `api/trx/${route.params.transactionId}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      setTransaction(data);

      setLoading(false);
      if (data.status === "checkoutSuccessfull") {
        navigation.replace("ThankYouAndReview", {
          spotId: data.parkingSpot._id,
        });
      }
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.msg,
        });
        console.log(error);
      }
      console.log(error);
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const paymentDB = transaction[0]?.paymentFee;
      const toPay =
        hourParking(transaction[0]?.checkinAt) * transaction[0]?.spotDetail.fee;

      let finalAmount = toPay - paymentDB;

      if (finalAmount === 0) {
        finalAmount = 2500;
      }

      const payment = await api({
        method: "POST",
        url: "/api/payment",
        data: {
          type: "payment",
          trxId: transaction[0]._id,
          amount: finalAmount,
        },
      });

      navigation.navigate("PaymentPage", {
        type: "payment",
        url: payment.data.paymentUrl.redirect_url,
      });
      setLoading(false);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data.msg,
        });
        console.log(error.response.data.msg);
      }
      console.log(error);
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    setLoading(true);
    try {
      const { data } = await api({
        method: "PUT",
        url: `/api/trx/${route.params.transactionId}/cancel`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      navigation.goBack();
      setLoading(false);
    } catch (error) {
      if (error.response) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data.msg,
        });
        console.log(error.response.data.msg);
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [code]);

  useEffect(() => {
    transaction[0]?.status === "checkoutSuccessfull"
      ? navigation.replace("ThankYouAndReview", {
          spotId: transaction[0]?.parkingSpot._id,
        })
      : "";
  }, [code, transaction]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={"Booking Detail"} onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={{ width: width, flexShrink: 1 }}>
            <Image
              source={img1}
              style={{ width: width - 48, height: 230 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>
            {transaction[0]?.status === "bookingPending" &&
              "Waiting Booking Payment"}
            {transaction[0]?.status === "bookingSuccessfull" &&
              "Waiting you to check in"}
            {transaction[0]?.status === "parking" && "Parking ..."}
            {transaction[0]?.status === "checkoutPending" &&
              "You're ready to checkout"}
          </Text>
          <View style={[styles.statusContainer]}>
            <View style={[styles.miniContainer, { marginBottom: 0 }]}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Status</Text>
              </View>
              <Text>
                {transaction[0]?.status === "bookingPending" &&
                  "Waiting Booking Payment"}
                {transaction[0]?.status === "bookingSuccessfull" &&
                  "Waiting you to check in"}
                {transaction[0]?.status === "parking" && "Parking"}
                {transaction[0]?.status === "checkoutPending" &&
                  "You're ready to checkout"}
              </Text>
            </View>
          </View>
          {transaction[0]?.status === "parking" && (
            <View style={[styles.statusContainer]}>
              <View style={[styles.miniContainer]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  <MaterialCommunityIcons
                    name="clock-check-outline"
                    size={24}
                    color="#007BFF"
                  />
                  <Text style={{ color: "#6C757D" }}>Checkin Time</Text>
                </View>
                <Text>{checkinTime(transaction[0]?.checkinAt)}</Text>
              </View>
              <View style={[styles.miniContainer]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  {/* <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="#007BFF"
                /> */}
                  <Foundation
                    name="dollar"
                    size={28}
                    color="#007BFF"
                    style={{ paddingHorizontal: 6 }}
                  />
                  <Text style={{ color: "#6C757D" }}>Hourly Rate</Text>
                </View>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(transaction[0]?.spotDetail.fee)}
                </Text>
              </View>
              <View style={[styles.miniContainer, { marginBottom: 0 }]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  <MaterialCommunityIcons
                    name="clock-time-eight-outline"
                    size={24}
                    color="#007BFF"
                  />
                  <Text style={{ color: "#6C757D" }}>Hour Count</Text>
                </View>
                <Text>{hourParking(transaction[0]?.checkinAt)}</Text>
              </View>
            </View>
          )}

          <View style={styles.statusContainer}>
            <View style={styles.miniContainer}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
                <MaterialCommunityIcons
                  name="parking"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Parking Spot</Text>
              </View>
              <Text>{transaction[0]?.parkingSpot?.name}</Text>
            </View>
            <View style={styles.miniContainer}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
                <MaterialCommunityIcons
                  name="home-floor-0"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Floor</Text>
              </View>
              <Text>{transaction[0]?.spotDetail?.floor}</Text>
            </View>
            <View style={styles.miniContainer}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                {/* <FontAwesome5 name="parking" size={24} color="#007BFF" /> */}
                <MaterialCommunityIcons
                  name="floor-plan"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Area</Text>
              </View>
              <Text>{transaction[0]?.spotDetail?.area}</Text>
            </View>
            <View style={[styles.miniContainer, { marginBottom: 0 }]}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                {/* <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="#007BFF"
                /> */}
                <Foundation
                  name="dollar"
                  size={28}
                  color="#007BFF"
                  style={{ paddingHorizontal: 6 }}
                />
                <Text style={{ color: "#6C757D" }}>Book Fee</Text>
              </View>
              <Text>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(transaction[0]?.bookingFee)}
              </Text>
            </View>
            <View style={[styles.miniContainer, { marginBottom: 0 }]}>
              <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="#007BFF"
                />
                <Text style={{ color: "#6C757D" }}>Check-in Before</Text>
              </View>
              <Text>{dateFormat(transaction[0]?.createdAt)}</Text>
            </View>
            {/* <View style={{ position: 'absolute', backgroundColor: 'rgba(208, 208, 208, 0.3)', top: 0, bottom: 0, left: 0, right: 0, borderRadius: 10 }} /> */}
          </View>

          {transaction[0]?.status === "checkoutPending" ||
          transaction[0]?.status === "checkoutSuccessfull" ? (
            <View style={[styles.statusContainer]}>
              <View style={[styles.miniContainer]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  <MaterialCommunityIcons
                    name="clock-check-outline"
                    size={24}
                    color="#007BFF"
                  />
                  <Text style={{ color: "#6C757D" }}>Checkin Time</Text>
                </View>
                <Text>{checkinTime(transaction[0]?.checkinAt)}</Text>
              </View>
              <View style={[styles.miniContainer]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  <MaterialCommunityIcons
                    name="clock-check-outline"
                    size={24}
                    color="#007BFF"
                  />
                  <Text style={{ color: "#6C757D" }}>Checkout Time</Text>
                </View>
                <Text>{checkinTime(transaction[0]?.paymentAt)}</Text>
              </View>
              <View style={[styles.miniContainer, { marginBottom: 0 }]}>
                <View
                  style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}
                >
                  {/* <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="#007BFF"
                /> */}
                  <Foundation
                    name="dollar"
                    size={28}
                    color="#007BFF"
                    style={{ paddingHorizontal: 6 }}
                  />
                  <Text style={{ color: "#6C757D" }}>Paid</Text>
                </View>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(transaction[0]?.paymentFee)}
                </Text>
              </View>
            </View>
          ) : (
            ""
          )}

          {transaction[0]?.status === "bookingSuccessfull" && (
            <View>
              <TouchableOpacity
                style={styles.buttonCheckin}
                onPress={() =>
                  // navigation.navigate("ShowQrCode", {
                  //   trxId: route.params.transactionId,
                  // })
                  setCode(true)
                }
              >
                <Text style={styles.buttonText}>Checkin Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={() => setIsCancel(true)}
              >
                <Text style={{ color: "#6C757D", textAlign: "center" }}>
                  Cancel Booking
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {transaction[0]?.status === "checkoutPending" && (
            <TouchableOpacity
              style={styles.buttonCheckin}
              onPress={() =>
                // navigation.navigate("ShowQrCode", {
                //   trxId: route.params.transactionId,
                //   type: "checkout",
                //   spotId: transaction[0]?.parkingSpot._id,
                // })
                setCode(true)
              }
            >
              <Text style={styles.buttonText}>Checkout Now</Text>
            </TouchableOpacity>
          )}
          {transaction[0]?.status === "bookingPending" && (
            <View>
              <TouchableOpacity
                style={styles.buttonCheckin}
                onPress={() =>
                  navigation.navigate("PaymentPage", {
                    url: transaction[0]?.paymentUrl,
                  })
                }
              >
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={() => setIsCancel(true)}
              >
                <Text style={{ color: "#6C757D", textAlign: "center" }}>
                  Cancel Booking
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {transaction[0]?.status === "parking" && (
            <TouchableOpacity
              style={styles.buttonCheckin}
              onPress={handleCheckout}
            >
              <Text style={styles.buttonText}>Pay to Checkout</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {code && (
        <BottomSheet
          snapPoints={["80%"]}
          // onClose={() => setIsOpen(false)}
          // backgroundStyle={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
          style={{ color: "red", flex: 1, topOffset: 0 }}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
        >
          <View
            style={{
              padding: 24,
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              {transaction[0].status === "bookingSuccessfull" &&
                "Checkin QR-Code"}
              {transaction[0].status === "checkoutPending" &&
                "Checkout QR-Code"}
            </Text>
            <View
              style={{
                gap: 20,
                alignItems: "center",
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {transaction[0].status === "bookingSuccessfull" &&
                  "Scan the QR code to enter the parking area."}
                {transaction[0].status === "checkoutPending" &&
                  "Scan the QR code to checkout from parking area."}
              </Text>
              <QRCode size={230} value={route.params.transactionId} />
              <Text style={{ fontWeight: "bold" }}>ParkMate</Text>
            </View>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  transaction[0]?.status === "checkoutSuccessfull"
                    ? navigation.replace("ThankYouAndReview", {
                        spotId: transaction[0]?.parkingSpot._id,
                      })
                    : "";
                  setCode(false);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#007BFF",
                  borderRadius: 10,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}
      {isCancel && (
        <BottomSheet
          snapPoints={["20%"]}
          onClose={() => setIsCancel(false)}
          enablePanDownToClose={true}
          // backgroundStyle={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
          style={{ color: "red", flex: 1, topOffset: 0 }}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
        >
          <View
            style={{
              padding: 24,
              flex: 1,
              alignItems: "center",
              gap: 12,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Are you sure to cancel this booking?
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsCancel(false);
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: "#007BFF",
                    borderRadius: 10,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>No, back to booking</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    cancelBooking();
                    setIsCancel(false);
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#6C757D",
                  }}
                >
                  <Text style={{ color: "#6C757D" }}>
                    Yes, cancel this booking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      )}
      {loading && <Loading />}
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  statusContainer: {
    // backgroundColor: "rgba(208, 208, 208, 0.3)",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 3 },
  },
  miniContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  buttonCheckin: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
