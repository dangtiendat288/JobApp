import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
class ReviewScreen extends Component {
  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const {
        jobkey,
        jobtitle,
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
      } = job;
      const region = {
        longitude,
        latitude,
        longitudeDelta: 0.04,
        latitudeDelta: 0.02,
      };
      return (
        <View style={styles.card} key={jobkey}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            {jobtitle}
          </Text>
          <MapView
            style={{ height: 100, marginBottom: 10 }}
            scrollEnabled={false}
            cacheEnabled={false}
            initialRegion={region}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={styles.button}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Apply</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }
  componentDidMount() {
    console.log(
      `componentDidMount ReviewScreen's likedJobs: ${this.props.likedJobs[0]}`
    );
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const mapStateToProps = ({ likedJobs }) => {
  console.log(`mapStateToProps ReviewScreen: ${likedJobs}`);
  return { likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);

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
    marginHorizontal: 20,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 0.5,
    height: 230,
  },
  italics: { fontStyle: "italic" },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
  },
});
