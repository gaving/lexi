import React, { Component } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { Speech } from "expo";

class Translation extends Component {
  static propTypes = {
    translation: PropTypes.string,
    word: PropTypes.string,
    focused: PropTypes.bool
  };
  state = {
    inProgress: false,
    pitch: 1,
    rate: 0.75,
    pressed: false
  };
  render() {
    const { inProgress, pressed } = this.state;
    const { translation, word, focused } = this.props;

    if (focused && !pressed) {
      Speech.speak(word, {
        language: "el",
        pitch: this.state.pitch,
        rate: this.state.rate
      });
    }

    return (
      <View>
        <TouchableOpacity
          style={styles.press}
          disabled={inProgress}
          activeOpacity={inProgress ? 1 : 0.3}
          onPress={() => {
            this.setState({ pressed: true });
            this._speak("el", word);
          }}
        >
          <Text style={styles.translation} key={translation}>
            {translation}
          </Text>
          <Ionicons
            name={inProgress ? "md-volume-up" : "md-volume-down"}
            style={styles.speaker}
            size={inProgress ? 32 : 24}
          />
        </TouchableOpacity>
      </View>
    );
  }
  _speak = (language, text) => {
    const { pitch, rate } = this.state;

    const start = () => {
      this.setState({ inProgress: true });
    };

    const complete = () => {
      this.state.inProgress && this.setState({ inProgress: false });
    };

    Speech.speak(text, {
      language,
      pitch,
      rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete
    });
  };
}

const styles = StyleSheet.create({
  press: {
    flexDirection: "row"
  },
  speaker: {
    color: "#CCC"
  },
  translation: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3F4C6B"
  }
});

export default Translation;
