import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";

import {
  AsyncStorage,
  View,
  StyleSheet,
  RefreshControl,
  ListView,
  TouchableOpacity
} from "react-native";

import { RkText, RkTextInput, RkStyleSheet } from "react-native-ui-kitten";

import { Ionicons } from "@expo/vector-icons";

const FAVOURITE_WORDS_KEY = "favourites";

class FavouritesScreen extends Component {
  static navigationOptions = {
    title: "Favourites",
    tabBarLabel: "Favourites",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-star" : "ios-star-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    refreshing: false
  };

  constructor(props) {
    super(props);

    this.favourites = [];

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      data: ds.cloneWithRows(this.favourites)
    };

    this.filter = this._filter.bind(this);
    this.setData = this._setData.bind(this);
    this.renderHeader = this._renderHeader.bind(this);
    this.renderRow = this._renderRow.bind(this);
  }

  async _fetchData() {
    return await AsyncStorage.getItem(FAVOURITE_WORDS_KEY)
      .then(data => {
        return JSON.parse(data);
      })
      .then(words => {
        return WORD_SET.filter(word => {
          return words.includes(word.id);
        });
      });
  }

  async componentWillMount() {
    this.favourites = await this._fetchData();
    this._updateList(this.favourites);
  }

  _updateList(favs) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      data: ds.cloneWithRows(favs)
    });
  }

  _setData(data) {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      data: ds.cloneWithRows(data)
    });
  }

  _renderRow(row) {
    const { id, source, translation } = row;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("SpecificWord", { id })}
      >
        <View style={styles.container}>
          <View style={styles.text}>
            <RkText>{translation}</RkText>
          </View>
          <View style={styles.attachment}>
            <RkText rkType="right secondary5 hintColor">{source}</RkText>
          </View>
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
    let favourites = this.favourites.filter(favourite => {
      return favourite.translation.search(pattern) !== -1;
    });

    this.setData(favourites);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this._fetchData().then(favs => {
      this.setState({ refreshing: false });
      this._updateList(favs);
    });
  }

  render() {
    return (
      <ListView
        style={styles.root}
        dataSource={this.state.data}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
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
  },
  attachment: {
    position: "absolute",
    right: 10
  }
}));

export default FavouritesScreen;
