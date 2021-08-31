import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";
import MapView from "react-native-maps";
import * as actions from "../actions";

class DeckScreen extends Component {
  renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.04,
      latitudeDelta: 0.02,
    };
    return (
      <View style={styles.card}>
        <Text style={styles.jobTitle}>{job.jobtitle}</Text>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1, marginBottom: 10 }}
            cacheEnabled={false}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet}</Text>
      </View>
    );
  };

  renderNoMoreCards = () => {
    return (
      <View style={styles.card}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          No more card!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Main", { screen: "Map" });
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Back to Map
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    // console.log(`deck's job : ${this.props.jobs}`);
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={(job) => {
            this.props.likeJob(job);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ jobs }) => {
  // console.log(jobs.results);
  return { jobs: jobs.results };
};

export default connect(mapStateToProps, actions)(DeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 10,
    borderWidth: 0.5,
  },
  jobTitle: { textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 50,
  },
});
