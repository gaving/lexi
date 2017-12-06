import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";
import Swiper from "react-native-swiper";
import moment from "moment";

import { View } from "react-native";

import { RkStyleSheet } from "react-native-ui-kitten";

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
  render() {
    const { currentIndex } = this.state;
    const { params } = this.props.navigation.state;

    const dayOfYear = moment().dayOfYear();
    let words = WORD_SET.slice(dayOfYear - 1, dayOfYear + 2);

    if (params) {
      const { id } = params;
      words = [WORD_SET[id]];
    }

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
              key={word.id}
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
