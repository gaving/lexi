import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  SectionTranslator
} from "react-native";

import { Translator, TranslatorItem } from "react-native-elements";

import { ActivityIndicator, Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

class TranslatorScreen extends Component {
  static navigationOptions = {
    title: "Translator",
    tabBarLabel: "Translator",
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
