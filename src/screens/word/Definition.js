import React, { Component } from "react";
import PropTypes from "prop-types";

import { Text, ScrollView, StyleSheet } from "react-native";

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
      <ScrollView>
        {definition.length > 0 &&
          definition.map((definition, i) => (
            <Text key={i} style={styles.definition}>
              {`${++i}. ${definition.definition}`}
            </Text>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  definition: {
    padding: 5,
    fontFamily: "open-sans-bold",
    color: "#36393D"
  }
});

export default Definition;
