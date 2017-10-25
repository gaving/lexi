import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";
import Swiper from "react-native-swiper";
import moment from "moment";

import { View, StyleSheet, Text } from "react-native";

import { Constants } from "expo";

import Switcher from "./Switcher";
import WordView from "./WordView";

class WordScreen extends Component {
  static navigationOptions = {
    title: "Word of the Day",
    headerStyle: {
      paddingTop: Constants.statusBarHeight,
      height: 60 + Constants.statusBarHeight,
      backgroundColor: "#3F4C6B"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };
  state = {
    words: [],
    currentIndex: 1
  };
  async componentWillMount() {
    // const shuffled = WORD_SET.sort(() => {
    //   return 0.5 - Math.random();
    // });

    // const dayOfYear = Math.floor(Math.random() * (365 - 1 + 1) + 1);
    const dayOfYear = moment().dayOfYear();
    const words = WORD_SET.slice(dayOfYear, dayOfYear + 3);

    this.setState({
      words
    });
  }
  render() {
    const { words, currentIndex } = this.state;

    return (
      <View style={styles.container}>
        <Switcher index={currentIndex} />
        <Swiper
          showsButtons
          nextButton={<Text style={styles.buttonText}>&gt;</Text>}
          prevButton={<Text style={styles.buttonText}>&lt;</Text>}
          index={1}
          loop={false}
          showsPagination={true}
          onIndexChanged={index => {
            this.setState({ currentIndex: index });
          }}
        >
          {words.map((word, i) => (
            <WordView key={i} focused={i === currentIndex} word={word} />
          ))}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#356AA0"
  }
});

export default WordScreen;
