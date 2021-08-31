import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    // AsyncStorage.removeItem("fb_token");
    console.log(`componentDidMount's prop: ${this.props.token}`);
    this.onAuthComplete(this.props);
  }

  componentDidUpdate() {
    this.onAuthComplete(this.props);
  }

  onAuthComplete(props) {
    console.log(`onAuthComplete's prop: ${props.token}`);
    if (props.token) {
      props.navigation.navigate("Main", { screen: "Map" });
    }
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
      </View>
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

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
