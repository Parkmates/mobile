import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BookOpen, Codepen, Feather, Home, User } from "react-native-feather";

export default function TabBar({ state, descriptors, navigation }) {
  // const icons = {
  //     home => <Home size={24} color={'#000'} {...props}/>,

  // }
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {route.name === "Home" && <Home size={24} color={isFocused ? "#007BFF" : "#222" } />}
            {route.name === "Book" && <BookOpen size={24} color={isFocused ? "#007BFF" : "#222" } />}
            {route.name === "Park" && <Codepen size={24} color={isFocused ? "#007BFF" : "#222" } />}
            {route.name === "Profile" && <User size={24} color={isFocused ? "#007BFF" : "#222" } />}
            {/* <Text style={{ color: isFocused ? "#007BFF" : "#222" }}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: '#F5F7F8'
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
