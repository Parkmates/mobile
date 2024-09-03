import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 20,
    gap: 10,
  },
  inputView: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
});
