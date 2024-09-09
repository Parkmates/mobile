import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Hr from "./Hr";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Loading from "./Loading";

const HomeActiveBooking = ({
  type,
  onPress,
  isEmpyt,
  name,
  until,
  status,
  img,
  isLoading,
}) => {
  const stat = status || "bookingPending";

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

  if (isLoading === true) {
    return (
      // if empty
      <TouchableOpacity style={styles.containerEmpty}>
        <ActivityIndicator size={"large"} color={"#007BFF"} />
      </TouchableOpacity>
    );
  } else if (isLoading === false && isEmpyt === true) {
    return (
      // if empty
      <TouchableOpacity style={styles.containerEmpty}>
        <Text>You havent booking yet.</Text>
        <TouchableOpacity style={styles.buttonBookNow} onPress={onPress}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  return (
    // if empty
    // <TouchableOpacity style={styles.containerEmpty}>
    //   <Text>You havent booking yet.</Text>
    //   <TouchableOpacity style={styles.buttonBookNow}>
    //     <Text style={styles.bookNowText}>Book Now</Text>
    //   </TouchableOpacity>
    // </TouchableOpacity>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainerTop}>
        <Image
          source={{
            uri: img,
          }}
          height={80}
          width={80}
          resizeMode="cover"
          style={{ borderRadius: 10 }}
        />
        <View style={styles.rightContainer}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.name}>{name}</Text>
              {type === "car" ? (
                <Ionicons name="car" size={26} color={"black"} />
              ) : (
                <Fontisto name="motorcycle" size={23} color={"black"} />
              )}
            </View>
            {/* <Hr pad={8} /> */}
            <View style={styles.addressContainer}>
              <View style={styles.containerAddressInside}>
                <Text style={styles.address}>Valid Until</Text>
                <Text style={styles.address}>:</Text>
                <Text style={[styles.address, { flexShrink: 1 }]}>
                  {dateFormat(until)}
                </Text>
              </View>
              {/* <View style={styles.containerAddressInside}>
                <Text style={styles.address}>:</Text>
              </View>
              <View style={[styles.containerAddressInside, { width: '100%' }]}>
                <Text style={styles.address}>{until}</Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
      <Hr pad={12} />
      {/* <TouchableOpacity style={styles.buttonCheckin}>
        <Text style={styles.bookNowText}>Checkin Now</Text>
      </TouchableOpacity> */}
      <View style={[styles.miniContainer, { marginBottom: 0 }]}>
        <View style={[styles.miniContainer, { gap: 8, marginBottom: 0 }]}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={24}
            color="#007BFF"
          />
          <Text style={{ color: "#6C757D" }}>Status</Text>
        </View>
        <Text style={{ color: "#6C757D" }}>
          {stat === "bookingPending" && "Waiting Booking Payment"}
          {stat === "bookingSuccessfull" && "Waiting you to check in"}
          {stat === "parking" && "Parking"}
          {stat === "checkoutPending" && "Waiting Payment"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeActiveBooking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e2e2",
    padding: 12,
    borderRadius: 12,
  },
  innerContainerTop: {
    flexDirection: "row",
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  address: {
    color: "#6C757D",
    fontSize: 12,
  },
  addressContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,
    // justifyContent: 'space-between'
  },
  buttonCheckin: {
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    marginTop: 18,
  },
  containerAddressInside: {
    // marginRight: 10,
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  containerEmpty: {
    backgroundColor: "#e2e2e2",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 190,
  },
  buttonBookNow: {
    width: "50%",
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    marginTop: 18,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 12,
  },
  miniContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
