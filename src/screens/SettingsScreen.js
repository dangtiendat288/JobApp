import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.clearLikedJobs();
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Reset Liked Jobs
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 50,
  },
});
