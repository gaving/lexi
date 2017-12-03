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

import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { AppLoading, Font } from "expo";

import Translation from "./Translation";
import Definition from "./Definition";

class WordView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    isReady: false
  };
  async componentWillMount() {
    const { word } = this.props;
    const translation = await this.fetchTranslation(word);
    const definition = await this.fetchDefinition(translation);
    this.setState({
      word,
      translation,
      definition,
      isReady: true
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
    const { translation, word, definition, isReady } = this.state;

    if (!isReady) {
      return <AppLoading />;
    }

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
                {`${translation}`}
              </RkText>
              <RkText rkType="secondary2 hintColor">
                {moment().format("dddd, MMMM Do")}
              </RkText>
            </View>
            <TouchableOpacity>
              <RkText rkType="secondary2 hintColor">
                <Ionicons name="md-volume-up" size={32} />
              </RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.content} rkCardContent>
            <Translation
              word={word}
              translation={translation}
              focused={focused}
            />
            <Definition style={styles.def} definition={definition} />
          </View>
          <View style={styles.section} rkCardFooter>
            <RkButton rkType="clear">
              <RkText rkType="hintColor" style={styles.icon}>
                <Ionicons name="md-heart" />
              </RkText>
              <RkText rkType="primary4 hintColor" style={styles.label}>
                18 Likes
              </RkText>
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
  },
  section: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  icon: {
    fontSize: 20
  },
  label: {
    marginLeft: 8,
    alignSelf: "flex-end"
  }
}));

export default WordView;
