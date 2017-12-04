import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  SectionFavourites
} from "react-native";

import { ActivityIndicator, Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

class FavouritesScreen extends Component {
  static navigationOptions = {
    title: "Favourites",
    tabBarLabel: "Favourites",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-heart" : "ios-heart-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {};

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});

export default FavouritesScreen;
