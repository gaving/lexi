import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment";

import { RkCard, RkStyleSheet, RkText, RkButton } from "react-native-ui-kitten";

import {
  AsyncStorage,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import { AppLoading } from "expo";

import Translation from "./Translation";
import Definition from "./Definition";

const FAVOURITE_WORDS_KEY = "favourites";

class WordView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    isReady: false,
    favourite: false
  };
  async componentWillMount() {
    const { word } = this.props;
    const { id, source, translation } = word;

    const definition = await this.fetchDefinition(translation);
    const favourites = await AsyncStorage.getItem(FAVOURITE_WORDS_KEY).then(
      data => {
        return JSON.parse(data);
      }
    );

    this.setState({
      id,
      word: source,
      translation,
      definition,
      isReady: true,
      favourite: favourites.includes(id)
    });
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
  async onFavouritePress() {
    const { favourite, id } = this.state;

    this.setState({
      favourite: !favourite
    });

    try {
      AsyncStorage.getItem(FAVOURITE_WORDS_KEY, (err, result) => {
        const words = [id];
        if (result !== null) {
          const favourites = JSON.parse(result);
          const newWords = favourite
            ? favourites.filter(e => e !== id)
            : favourites.concat(words);
          AsyncStorage.setItem(FAVOURITE_WORDS_KEY, JSON.stringify(newWords));
        } else {
          AsyncStorage.setItem(FAVOURITE_WORDS_KEY, JSON.stringify(words));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  onTranslationPress() {
    const { translation } = this.refs;
    translation.onPress();
  }
  render() {
    const { translation, word, definition, isReady, favourite } = this.state;

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
      <ScrollView style={styles.root} scrollEnabled={false}>
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
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.onFavouritePress.bind(this)}>
                <RkText rkType="secondary2 hintColor">
                  <Ionicons
                    name={favourite ? "md-star" : "md-star-outline"}
                    size={32}
                  />
                </RkText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={this.onTranslationPress.bind(this)}
              >
                <RkText rkType="secondary2 hintColor">
                  <Ionicons name="md-volume-up" size={32} />
                </RkText>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView rkCardContent style={styles.content}>
            <Translation
              word={word}
              translation={translation}
              focused={focused}
              ref="translation"
            />
            <Definition style={styles.def} definition={definition} />
          </ScrollView>
          <View style={styles.section} rkCardFooter />
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
    maxHeight: 280
  },
  section: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

export default WordView;
