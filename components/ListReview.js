import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

export default function ListReview({ user, comment }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 20,
        paddingLeft: 24,
        paddingRight: 24,
        borderBottomWidth: 0.5,
        borderColor: "#323232",
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{
          uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
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
          <Text style={{ fontWeight: "bold" }}>{user}</Text>
          <Text style={{ color: "#727272" }}>{comment}</Text>
        </View>
      </View>
    </View>
  );
}
