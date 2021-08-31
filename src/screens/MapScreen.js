import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as Location from "expo-location";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
    Location.requestForegroundPermissionsAsync();
  }

  onRegionChangeComplete = (region) => {
    // console.log(region);
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("Main", { screen: "Deck" });
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <TouchableOpacity
          onPress={this.onButtonPress}
          style={styles.buttonContainer}
        >
          <Text style={styles.textStyle}>Search Jobs</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, actions)(MapScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
  },
  textStyle: { color: "white", textAlign: "center" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
