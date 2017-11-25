import React from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { Platform } from "react-native";

import { WordScreen } from "./src/screens/word";
import { ListScreen } from "./src/screens/list";
import { SettingsScreen } from "./src/screens/settings";

const MainNavigator = TabNavigator(
  {
    List: {
      screen: ListScreen,
      path: "record"
    },
    Word: {
      screen: WordScreen,
      path: "word",
      params: { word: "0" }
    },
    Settings: {
      screen: SettingsScreen,
      path: "settings"
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
