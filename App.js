import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Facebook from "expo-facebook";

import AuthScreen from "./src/screens/AuthScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

import MapScreen from "./src/screens/MapScreen";
import DeckScreen from "./src/screens/DeckScreen";

import ReviewScreen from "./src/screens/ReviewScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ReviewStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Review"
      component={ReviewScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Text>Settings</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const Main = () => (
  <Tab.Navigator>
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Deck" component={DeckScreen} />
    <Tab.Screen name="ReviewStack" component={ReviewStack} />
  </Tab.Navigator>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ header: () => {} }}>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Auth" component={AuthScreen} />
            <Tab.Screen name="Main" component={Main} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
