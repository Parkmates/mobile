import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable } from "react-native";

export default function ParkList({ onPress, name, address, img }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "start",
          gap: 12,
          padding: 20,
          backgroundColor: "#F3F4F5",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Image
          style={{ width: 85, height: 85, borderRadius: 10 }}
          source={{
            uri: img,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#757575",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  Car
                </Text>
              </View>
              <View
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#757575",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  Bike
                </Text>
              </View>
            </View>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text style={{ color: "#727272" }} numberOfLines={2}>{address}</Text>
            {/* <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ color: "#727272", fontSize: 12 }}>harga/jam</Text>
              <Text style={{ color: "#727272", fontSize: 12 }}>
                28 available
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
