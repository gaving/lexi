import React from "react";

import { StackNavigator } from "react-navigation";

import { WordScreen } from "./src/screens/word";

const AppRoot = StackNavigator({
  MainNavigator: { screen: WordScreen }
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
