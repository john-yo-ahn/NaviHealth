import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import apiKeys from "./config/keys";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import LoadingScreen from "./screens/LoadingScreen";
import MainTabScreen from "./screens/MainTabScreen";
import GetStarted from "./screens/GetStartedScreen"
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Loading"}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"MainTab"}
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"GetStarted"}
          component={GetStarted}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
