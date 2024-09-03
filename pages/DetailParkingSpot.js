import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListReview from "../components/ListReview";

export default function DetailParkingSpot() {
  const { width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, gap: 20 }}>
      <Image
        style={{ width: width, height: 200 }}
        source={{
          uri: "https://fastly.picsum.photos/id/1032/200/300.jpg?hmac=QdMNx6kwGjGtQqK_jCFOZa06MImU1ePTGi3mpwLZmwo",
        }}
      />
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Parking spot name
        </Text>
        <Text style={{ fontSize: 12 }}>
          Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby.
          Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240.
        </Text>
        <Text style={{ fontSize: 12 }}>⭐️⭐️⭐️⭐️⭐️</Text>
      </View>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              width: "50%",
              padding: 10,
              backgroundColor: "#D9D9D9",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="car" size={40} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                textAlign: "center",
              }}
            >
              5
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              padding: 10,
              backgroundColor: "#D9D9D9",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="car" size={40} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                textAlign: "center",
              }}
            >
              4
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#007BFF",
            borderRadius: 10,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
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

      {/* REVIEW */}
      <Text style={{ fontWeight: "bold", paddingHorizontal: 20 }}>REVIEW</Text>
      <ScrollView>
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
      </ScrollView>
    </View>
  );
}
