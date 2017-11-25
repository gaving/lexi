import React, { Component } from "react";

import { View, StyleSheet } from "react-native";

import { Constants } from "expo";

import Ionicons from "react-native-vector-icons/Ionicons";

class SettingsScreen extends Component {
  static navigationOptions = {
    title: "Settings",
    tabBarLabel: "Settings",
    headerStyle: {
      paddingTop: Constants.statusBarHeight,
      height: 60 + Constants.statusBarHeight,
      backgroundColor: "#3F4C6B"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-settings" : "ios-settings-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {};
  async componentWillMount() {}
  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default SettingsScreen;
