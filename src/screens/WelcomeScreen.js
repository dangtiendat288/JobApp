import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slides from "../components/Slides";

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
  render() {
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
