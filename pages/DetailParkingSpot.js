import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListReview from "../components/ListReview";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Fontisto from "@expo/vector-icons/Fontisto";
import ChooseParkingSpot from "../components/ChooseParkingSpot";
import Hr from "../components/Hr";
import Toast from "react-native-toast-message";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";

export default function DetailParkingSpot({ navigation, route }) {
  const id = route.params.id;
  const { width } = Dimensions.get("window");
  const [isOpen, setIsOpen] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [activeSpotDetail, setActiveSpotDetail] = useState("");
  const [parkSpot, setParkSpot] = useState({});
  const [spotDetails, setSpotDetails] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [image, setImage] = useState([]);
  const [review, setReview] = useState([]);
  // console.log(id)
  const dummy = [1, 2, 3, 4, 5];

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    setPaginationIndex(viewableItems[0]?.index);
  };

  const getData = async () => {
    try {
      const { data } = await api({
        url: `api/parkspot/${id}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });

      if (vehicle) {
        const filter = await data.spotList.filter((e) => e.type === vehicle);
        setParkSpot(data);
        setReview(data.reviews);
        setImage(data.imgUrl);
        setSpotDetails(filter);
        return;
      }

      setParkSpot(data);
      setImage(data.imgUrl);
      setReview(data.reviews);
      setSpotDetails(data?.spotList);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.msg || error.message,
        topOffset: 50,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      getData();
    });
    getData();
  }, [vehicle]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <Header title={parkSpot.name} onPress={() => navigation.goBack()} />
      <ScrollView
        style={{ flex: 1, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Image
          style={{ width: width, height: 200, paddingTop: 0, marginTop: 0 }}
          resizeMode="cover"
          source={{
            uri: parkSpot?.imgUrl[0] ? parkSpot?.imgUrl[0] : "https://fastly.picsum.photos/id/1032/200/300.jpg?hmac=QdMNx6kwGjGtQqK_jCFOZa06MImU1ePTGi3mpwLZmwo",
          }}
        /> */}
        <FlatList
          data={parkSpot.imgUrl}
          renderItem={({ item, index }) => (
            <Image
              style={{ width: width, height: 200, paddingTop: 0, marginTop: 0 }}
              resizeMode="cover"
              source={{
                uri: item,
              }}
            />
          )}
          horizontal
          pagingEnabled
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.dotContainer}>
          {image.map((_, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: paginationIndex === i ? "#222" : "#aaa" },
                ]}
              ></View>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 20 }}>
            {parkSpot.name}
          </Text>
          <Text style={{ fontSize: 12 }}>{parkSpot.address}</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => setIsOpen(true)}
          >
            <Ionicons name="star" size={18} color="black" />
            <Text style={{ fontSize: 16, textDecorationLine: "underline" }}>
              {/* ⭐️⭐️⭐️⭐️⭐️ */}5
            </Text>
            <Ionicons name="chevron-forward" size={14} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 24, gap: 10, paddingTop: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Choose Your Vehicle
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 10,
                backgroundColor: vehicle === "car" ? "#007BFF" : "#D9D9D9",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setVehicle("car")}
            >
              <Ionicons
                name="car"
                size={40}
                color={vehicle === "car" ? "#fff" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 10,
                backgroundColor:
                  vehicle === "motorcycle" ? "#007BFF" : "#D9D9D9",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setVehicle("motorcycle")}
            >
              <Fontisto
                name="motorcycle"
                size={30}
                color={vehicle === "motorcycle" ? "#fff" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Chose your parking spot
            </Text>
            {spotDetails.map((e) => {
              return (
                <ChooseParkingSpot
                  key={e._id}
                  floor={e.floor}
                  area={e.area}
                  fee={e.fee}
                  spot={e.quantity}
                  type={activeSpotDetail === e._id ? "active" : ""}
                  onPress={() => setActiveSpotDetail(e._id)}
                  vehicle={e.type}
                />
              );
            })}
            {spotDetails.length < 1 && (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#6C757D",
                }}
              >
                Sorry, it's empty!
              </Text>
            )}
          </View>
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
      {/* Button Book Now */}
      {activeSpotDetail && (
        <View
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            left: 24,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#007BFF",
              borderRadius: 10,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              elevation: 10,
            }}
            onPress={() => {
              navigation.navigate("ConfirmationBooking", {
                id: id,
                spotId: activeSpotDetail,
              });
            }}
          >
            <Text style={{ color: "white" }}>
              Book Now
              {/* {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              Book Now
            )} */}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* REVIEW */}

      {isOpen && (
        <BottomSheet
          snapPoints={["80%"]}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
          // backgroundStyle={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
          // style={{ backgroundColor: 'red', flex: 1, topOffset: 0 }}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingBottom: 10,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Review
          </Text>
          <Hr />
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >
            {review.map((e) => {
              return <ListReview 
                key={e._id}
                user={e.user.name}
                comment={e.comment}
              />;
            })}
            {/* <Text
              style={{
                paddingVertical: 20,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Yay! you have seen it all
            </Text> */}
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 16,
  },
  dot: {
    backgroundColor: "#aaa",
    height: 6,
    width: 6,
    marginHorizontal: 2,
    borderRadius: 6,
  },
});
