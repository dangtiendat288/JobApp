import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import Slides from "../components/Slides";
import AppLoading from "expo-app-loading";

const SLIDE_DATA = [
  {
    text: "Welcome to JobApp",
    color: "#0389f4",
  },
  {
    text: "Use this app to get a job",
    color: "#009688",
  },
  {
    text: "Set your location, then swipe away",
    color: "#0389f4",
  },
];

export default class WelcomeScreen extends Component {
  state = { token: null };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("fb_token");
    console.log(`componentDidMount: ${token}`);

    if (token) {
      this.props.navigation.navigate("Main", { screen: "Map" });
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  render() {
    if (this.state.token === null) {
      return <AppLoading />;
    }
    return <Slides data={SLIDE_DATA} navigation={this.props.navigation} />;
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
