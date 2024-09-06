import {
  Button,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListReview from "../components/ListReview";
import Header from "../components/Header";
import { useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Fontisto from "@expo/vector-icons/Fontisto";
import ChooseParkingSpot from "../components/ChooseParkingSpot";
import Hr from "../components/Hr";

export default function DetailParkingSpot({ navigation }) {
  const { width } = Dimensions.get("window");
  const [isOpen, setIsOpen] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [spotDetail, setSpotDetail] = useState("")

  const dummy = [1, 2, 3, 4, 5];
  return (
    <View style={{ flex: 1, justifyContent: "space-between" , backgroundColor: '#fff'}}>
      <Header title={"Central Park"} onPress={() => navigation.goBack()}/>
      <ScrollView
        style={{ flex: 1, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{ width: width, height: 200, paddingTop: 0, marginTop: 0 }}
          resizeMode="cover"
          source={{
            uri: "https://fastly.picsum.photos/id/1032/200/300.jpg?hmac=QdMNx6kwGjGtQqK_jCFOZa06MImU1ePTGi3mpwLZmwo",
          }}
        />
        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 20 }}>
            Parking spot name
          </Text>
          <Text style={{ fontSize: 12 }}>
            Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby.
            Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240.
          </Text>
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
                backgroundColor: vehicle === "motor" ? "#007BFF" : "#D9D9D9",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setVehicle("motor")}
            >
              <Fontisto
                name="motorcycle"
                size={30}
                color={vehicle === "motor" ? "#fff" : "black"}
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
            {dummy.map((e) => {
              return <ChooseParkingSpot 
                key={e}  
                floor={1}
                area={"A1"}
                fee={"10.000"}
                spot={12}
                type={spotDetail === e ? 'active' : ''}
                onPress={() => setSpotDetail(e)}
                vehicle={"motor"}
              />;
            })}
          </View>
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
      {/* Button Book Now */}
      {spotDetail && (
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
            }}
            onPress={() => {
              // navigation.goBack();
              navigation.navigate("ConfirmationBooking");
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
          style={{ elevation: 10 }}
        >
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
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
            <Hr/>
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <ListReview />
            <Text
              style={{
                paddingVertical: 20,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Yay! you have seen it all
            </Text>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
}
