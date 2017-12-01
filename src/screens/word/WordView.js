import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

import moment from "moment";

import {
  RkCard,
  RkTheme,
  RkStyleSheet,
  RkText,
  RkButton,
  RkModalImg
} from "react-native-ui-kitten";

import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

import { AppLoading, Font } from "expo";

import Translation from "./Translation";
import Definition from "./Definition";

class WordView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    word: "",
    ipa: ""
  };
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
      `https://translation.googleapis.com/language/translate/v2?key=${
        Config.GOOGLE_TRANSLATE_API_KEY
      }`,
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
    const { translation, word, ipa, definition } = this.state;
    const { index, focused } = this.props;
    const bg = [
      require("../../../assets/img/1.jpg"),
      require("../../../assets/img/2.jpg"),
      require("../../../assets/img/3.jpg")
    ];

    return (
      <ScrollView style={styles.root}>
        <RkCard rkType="article">
          <Image rkCardImg source={bg[index]} />
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType="header4">
                {moment().format("dddd, MMMM Do")}
              </RkText>
              <RkText rkType="secondary2 hintColor">{`${word} / ${
                ipa
              }`}</RkText>
            </View>
          </View>
          <View style={styles.content} rkCardContent>
            <Translation
              word={word}
              translation={translation}
              focused={focused}
            />
            <Definition style={styles.def} definition={definition} />
          </View>
          <View rkCardFooter>
            <RkButton rkType="clear link">
              <RkText rkType="hintColor">
                <Ionicons name="md-star" />
              </RkText>
              <RkText rkType="primary4 hintColor">18 Likes</RkText>
            </RkButton>
          </View>
        </RkCard>
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

export default WordView;
