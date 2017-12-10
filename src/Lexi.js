import React, { Component } from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { Platform } from "react-native";

import { WordScreen } from "./screens/word";
import { WordScreen as SpecificWordScreen } from "./screens/word";
import { HistoryScreen } from "./screens/history";
// import { TranslatorScreen } from "./screens/translator";
import { FavouritesScreen } from "./screens/favourites";

import { bootstrap } from "./theme/bootstrap";
import cacheAssetsAsync from "./utilities/cacheAssetsAsync";

import { AppLoading } from "expo";

const MainNavigator = TabNavigator(
  {
    History: {
      screen: HistoryScreen,
      path: "history"
    },
    Word: {
      screen: WordScreen,
      path: "word",
      params: { id: 0 },
      navigationOptions: {
        header: null
      }
    },
    Favourites: {
      screen: FavouritesScreen,
      path: "favourites"
    }
    // Translator: {
    //   screen: TranslatorScreen,
    //   path: "translator"
    // }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#e91e63" : "#fff"
    },
    initialRouteName: "Word",
    lazy: true
  }
);

const Navigator = StackNavigator({
  MainNavigator: { screen: MainNavigator },
  SpecificWord: {
    screen: SpecificWordScreen,
    path: "/words/:word"
  }
});

export default class Lexi extends Component {
  state = {
    isReady: false
  };
  async _loadAssetsAsync() {
    bootstrap();
    await cacheAssetsAsync({
      images: [
        require("../assets/img/1.jpg"),
        require("../assets/img/2.jpg"),
        require("../assets/img/3.jpg")
      ],
      fonts: [
        { "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf") },
        { "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf") },
        { "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf") },
        {
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf")
        },
        {
          "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf")
        }
      ]
    });
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Navigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}
