import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView as Andorid } from "react-native-safe-area-context";
import StackNavigator from "./components/StackNavigator";


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Andorid style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Andorid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
