import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment";

import { RkCard, RkStyleSheet, RkText, RkButton } from "react-native-ui-kitten";

import { ScrollView, View, Image, TouchableOpacity } from "react-native";

import { AppLoading } from "expo";

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
    const { source, translation } = word;
    const definition = await this.fetchDefinition(translation);
    this.setState({
      word: source,
      translation,
      definition,
      isReady: true
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
  onTranslationPress() {
    const { translation } = this.refs;
    translation.onPress();
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
            <TouchableOpacity onPress={this.onTranslationPress.bind(this)}>
              <RkText rkType="secondary2 hintColor">
                <Ionicons name="md-volume-up" size={32} />
              </RkText>
            </TouchableOpacity>
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
          <View style={styles.section} rkCardFooter>
            <RkButton rkType="clear" />
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
    maxHeight: 280
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
