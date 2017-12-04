import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  SectionHistory,
  ListView,
  TouchableOpacity
} from "react-native";

import {
  RkCard,
  RkText,
  RkTextInput,
  RkStyleSheet
} from "react-native-ui-kitten";
import { ActivityIndicator, Constants } from "expo";

import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

class HistoryScreen extends Component {
  static navigationOptions = {
    title: "History",
    tabBarLabel: "History",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-paper" : "ios-paper-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    words: [],
    loading: true
  };

  constructor(props) {
    super(props);

    this.users = WORD_SET;

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows(this.users)
    };

    this.filter = this._filter.bind(this);
    this.setData = this._setData.bind(this);
    this.renderHeader = this._renderHeader.bind(this);
    this.renderRow = this._renderRow.bind(this);
  }

  async componentWillMount() {
    const dayOfYear = moment().dayOfYear();
    const words = WORD_SET.slice(0, dayOfYear + 1);

    this.setState({
      words,
      loading: false
    });
  }

  onPress(word) {
    const { navigate } = this.props.navigation;
    navigate("Word", { word });
  }

  _setData(data) {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      data: ds.cloneWithRows(data)
    });
  }

  _renderRow(row) {
    let name = `${row}`;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("word", { id: row })}
      >
        <View style={styles.container}>
          <RkText>{name}</RkText>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    return <View style={styles.separator} />;
  }

  _renderHeader() {
    return (
      <View style={styles.searchContainer}>
        <RkTextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={event => this._filter(event.nativeEvent.text)}
          label={<Ionicons name="md-search" />}
          rkType="row"
          placeholder="Search"
        />
      </View>
    );
  }

  _filter(text) {
    let pattern = new RegExp(text, "i");
    let users = this.users.filter(user => {
      if (user.search(pattern) != -1) return user;
    });

    this.setData(users);
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <ListView
        style={styles.root}
        dataSource={this.state.data}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        enableEmptySections={true}
      />
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  avatar: {
    marginRight: 16
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  }
}));

export default HistoryScreen;
