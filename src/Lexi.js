import React, { Component } from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { Platform } from "react-native";

import { WordScreen } from "./screens/word";
import { HistoryScreen } from "./screens/history";
import { TranslatorScreen } from "./screens/translator";
import { FavouritesScreen } from "./screens/favourites";

import { bootstrap } from "./theme/bootstrap";

const MainNavigator = TabNavigator(
  {
    History: {
      screen: HistoryScreen,
      path: "history"
    },
    Word: {
      screen: WordScreen,
      path: "word",
      params: { word: "0" }
    },
    Favourites: {
      screen: FavouritesScreen,
      path: "favourites"
    },
    Translator: {
      screen: TranslatorScreen,
      path: "translator"
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#e91e63" : "#fff"
    },
    navigationOptions: { header: null },
    initialRouteName: "Word"
  }
);

const Navigator = StackNavigator({
  MainNavigator: { screen: MainNavigator }
});

export default class Lexi extends Component {
  async componentWillMount() {
    await bootstrap();
  }
  render() {
    return (
      <Navigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
