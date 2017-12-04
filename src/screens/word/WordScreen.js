import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";
import Swiper from "react-native-swiper";
import moment from "moment";

import { View, StyleSheet, Text } from "react-native";

import { RkCard, RkText, RkStyleSheet } from "react-native-ui-kitten";

import { FileSystem, Asset, Constants, SQLite } from "expo";

import { Ionicons } from "@expo/vector-icons";

import WordView from "./WordView";

class WordScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: "Word",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-calendar" : "ios-calendar-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    words: [],
    currentIndex: 1
  };

  async componentDidMount() {
    const dayOfYear = moment().dayOfYear();
    const words = WORD_SET.slice(dayOfYear - 1, dayOfYear + 2);

    this.setState({
      words
    });
  }
  componentWillReceiveProps() {
    const { state } = this.props.navigation;

    if (state && state.params) {
      const { word } = state.params;
      const words = [WORD_SET[word]];
      this.setState({
        words
      });
    }
  }
  render() {
    const { currentIndex } = this.state;
    let { words } = this.state;

    return (
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          index={1}
          loop={false}
          showsPagination={true}
          onIndexChanged={index => {
            this.setState({ currentIndex: index });
          }}
        >
          {words.map((word, i) => (
            <WordView
              key={i}
              index={i}
              focused={i === currentIndex}
              word={word}
            />
          ))}
        </Swiper>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  buttonText: {}
}));

export default WordScreen;
