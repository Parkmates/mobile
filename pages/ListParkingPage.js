import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { useState } from "react";
// import UserList from "../components/UserList";
import Ionicons from "@expo/vector-icons/Ionicons";
import ParkList from "../components/ParkList";

export default function ListParkingPage() {
  const [keyword, setKeyword] = useState("");
  return (
    <SafeAreaView style={globalStyles.container}>
      <>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 30,
            padding: 20,
            paddingLeft: 10,
            paddingRight: 10,
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
          <ScrollView style={{ width: "100%", marginBottom: 110 }}>
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
            <ParkList />
          </ScrollView>
        </View>
      </>
    </SafeAreaView>
  );
}
