import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  SectionHistory
} from "react-native";

import { ActivityIndicator, Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

class HistoryScreen extends Component {
  static navigationOptions = {
    title: "History",
    tabBarLabel: "History",
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
        name={focused ? "ios-paper" : "ios-paper-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    words: [],
    loading: true
  };

  async componentWillMount() {
    const dayOfYear = moment().dayOfYear();
    const words = WORD_SET.slice(0, dayOfYear + 1);

    this.setState({
      words,
      loading: false
    });
  }

  onPress(word) {
    const { navigate } = this.props.navigation;
    navigate("Word", { word });
  }

  render() {
    const { loading, words } = this.state;

    if (loading) {
      return <ActivityIndicator />;
    }

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

export default HistoryScreen;
