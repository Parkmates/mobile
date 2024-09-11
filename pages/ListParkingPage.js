import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";
// import UserList from "../components/UserList";
import Ionicons from "@expo/vector-icons/Ionicons";
import ParkList from "../components/ParkList";
import { api } from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export default function ListParkingPage({ navigation }) {
  const [parkSpot, setParkSpot] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api({
        url: `/api/parkspot?name=${name}`,
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });
      // console.log(data)
      setParkSpot(data);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data.msg,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [name]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 30,
            padding: 20,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons name="search" size={20} color="#717171" />
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  paddingLeft: 10,
                }}
                placeholder="Search"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
          </View>
          {/* {loading ? (
            <ActivityIndicator size="small" color="#ffff" />
          ) : (
            <>
              {data.users.length === 0 && (
                <Text style={{ color: "white" }}>No user found</Text>
              )}
              <ScrollView style={{ width: "100%", marginBottom: 80 }}>
                {data.users.map((e) => (
                  <UserList key={e._id} user={e} refetch={refetch} />
                ))}
              </ScrollView>
            </>
          )} */}
          <ScrollView
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            {parkSpot.map((e) => {
              return (
                <ParkList
                  key={e._id}
                  onPress={() =>
                    navigation.navigate("DetailParking", { id: e._id })
                  }
                  name={e.name}
                  address={e.address}
                  img={e.imgUrl[0]}
                />
              );
            })}
            {/* <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList /> */}
            {loading === false && parkSpot.length === 0 && (
              <Text
                style={{
                  color: "#6C757D",
                  textAlign: "center",
                }}
              >
                Sorry, Parking spot not found
              </Text>
            )}
            {loading && <ActivityIndicator size={"large"} color={"#007BFF"} />}
            <View style={{ height: 120 }} />
          </ScrollView>
        </View>
      </>
    </SafeAreaView>
  );
}
