import React, { Component, PropTypes } from "react";

import moment from "moment";

import { Text, View } from "react-native";

class Switcher extends Component {
  static propTypes = {
    index: PropTypes.number
  };
  render() {
    const { index } = this.props;

    const date = moment();
    if (index === 2) {
      date.add(1, "d");
    } else if (index === 0) {
      date.subtract(1, "d");
    }

    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10
        }}
      >
        <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
          {date.format("dddd, MMMM Do")}
        </Text>
      </View>
    );
  }
}

export default Switcher;
