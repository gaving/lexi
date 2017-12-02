import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, ScrollView, StyleSheet } from "react-native";

import {
  RkCard,
  RkTheme,
  RkText,
  RkButton,
  RkModalImg
} from "react-native-ui-kitten";

class Definition extends Component {
  static propTypes = {
    definition: PropTypes.array
  };
  static defaultProps = {
    definition: []
  };
  render() {
    const { definition } = this.props;
    return (
      <View>
        {definition.length > 0 &&
          definition.map((definition, i) => (
            <RkText rkType="secondary1" style={styles.def} key={i}>
              <RkText rkType="primary4" key={i}>
                {`(${++i}. ${definition.partOfSpeech})`}
              </RkText>
              {` ${definition.definition}`}
            </RkText>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  def: {
    padding: 5
  }
});

export default Definition;
