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
  const [keyword, setKeyword] = useState("");
  const [parkSpot, setParkSpot] = useState([]);

  const getData = async () => {
    try {
      const { data } = await api({
        url: "/api/parkspot",
        headers: {
          Authorization: `Bearer ${SecureStore.getItem("access_token")}`,
        },
      });
      // console.log(data)
      setParkSpot(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data.msg,
        topOffset: 50,
      });
    }
  };

  useEffect(() => {
    getData();
  }, [])
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
                value={keyword}
                onChangeText={setKeyword}
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
              return <ParkList 
                key={e._id} 
                onPress={() => navigation.navigate('DetailParking', { id: e._id })}
                name={e.name}
                address={e.address}
                img={e.imgUrl[0]}
              />;
            })}
            {/* <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList /> */}
            <View style={{ height: 120 }} />
          </ScrollView>
        </View>
        {parkSpot.length === 0 && <ActivityIndicator size={'large'} color={"#007BFF"} />}
      </>
    </SafeAreaView>
  );
}
