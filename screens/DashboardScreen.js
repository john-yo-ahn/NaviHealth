import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
