import React from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { Platform } from "react-native";

import { WordScreen } from "./src/screens/word";
import { HistoryScreen } from "./src/screens/history";
import { TranslatorScreen } from "./src/screens/translator";
import { FavouritesScreen } from "./src/screens/favourites";

import { bootstrap } from "./bootstrap";

bootstrap();

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

const AppRoot = StackNavigator({
  MainNavigator: { screen: MainNavigator }
});

export default class App extends React.Component {
  render() {
    return (
      <AppRoot
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
