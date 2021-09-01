import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import storeAndPersistor from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import * as Facebook from "expo-facebook";

import AuthScreen from "./src/screens/AuthScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

import MapScreen from "./src/screens/MapScreen";
import DeckScreen from "./src/screens/DeckScreen";

import ReviewScreen from "./src/screens/ReviewScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const { store, persistor } = storeAndPersistor();

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
  <Tab.Navigator
    screenOptions={({ route }) => ({
      header: () => {},
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Map") {
          iconName = focused ? "map" : "map-o";
        } else if (route.name === "Deck") {
          iconName = focused ? "file" : "file-o";
        } else if (route.name === "ReviewStack") {
          iconName = focused ? "heart" : "heart-o";
        }

        // You can return any component that you like here!
        return <FontAwesome name={iconName} size={25} color={"black"} />;
      },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Deck" component={DeckScreen} />
    <Tab.Screen name="ReviewStack" component={ReviewStack} />
  </Tab.Navigator>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: () => {} }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
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
