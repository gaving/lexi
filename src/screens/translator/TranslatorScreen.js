import React, { Component } from "react";

import { View, StyleSheet } from "react-native";

import { Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";

class TranslatorScreen extends Component {
  static navigationOptions = {
    title: "Translator",
    tabBarLabel: "Translator",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-pulse" : "ios-pulse-outline"}
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

export default TranslatorScreen;
