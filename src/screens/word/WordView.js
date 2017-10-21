import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";

import { Text, View, StyleSheet } from "react-native";

import { AppLoading, Font } from "expo";

import Translation from "./Translation";
import Definition from "./Definition";

class WordView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    word: "",
    ipa: "",
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-bold": require("../../../assets/fonts/OpenSans-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  async componentWillMount() {
    const { word } = this.props;
    const ipa = await this.fetchIPA(word);
    const translation = await this.fetchTranslation(word);
    const definition = await this.fetchDefinition(translation);
    this.setState({
      ipa,
      word,
      translation,
      definition
    });
  }
  async fetchTranslation(word) {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${Config.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "post",
        body: JSON.stringify({
          q: word,
          source: "el",
          target: "en",
          format: "text"
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
    return response.data.translations[0].translatedText;
  }
  async fetchIPA(word) {
    const response = await fetch(
      "https://qobmuykvqg.execute-api.eu-west-1.amazonaws.com/dev/ipa",
      {
        method: "post",
        body: JSON.stringify({
          text: word,
          language: "el"
        })
      }
    )
      .then(res => {
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
    return response.text;
  }
  async fetchDefinition(word) {
    const response = await fetch(
      `https://wordsapiv1.p.mashape.com/words/${word}`,
      {
        headers: {
          "X-Mashape-Key": Config.WORD_API_KEY
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
    return response ? response.results : [];
  }
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    const { translation, word, ipa, definition } = this.state;
    const { focused } = this.props;

    return (
      <View>
        {this.state.fontLoaded ? (
          <View style={styles.translationWrapper}>
            <View style={styles.wordWrapper}>
              <Translation
                style={styles.translation}
                word={word}
                translation={translation}
                focused={focused}
              />
              <Text style={styles.word}>{word}</Text>
              <Text style={styles.ipa} key={ipa}>
                {ipa}
              </Text>
            </View>
            <View style={styles.definitionWrapper}>
              <Definition definition={definition} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  translationWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  wordWrapper: {
    padding: 30,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  },
  definitionWrapper: {
    paddingTop: 50,
    width: 300,
    height: 300,
    justifyContent: "center"
  },
  word: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#356AA0"
  },
  ipa: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C3D9FF"
  }
});

export default WordView;
