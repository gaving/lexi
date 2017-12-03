import React, { Component } from "react";
import WORD_SET from "../../../assets/words.json";
import Swiper from "react-native-swiper";
import moment from "moment";

// import DATABASE from "~/assets/db.db";
import { View, StyleSheet, Text } from "react-native";

import { RkCard, RkText, RkStyleSheet } from "react-native-ui-kitten";

import { FileSystem, Asset, Constants, SQLite } from "expo";

import { Ionicons } from "@expo/vector-icons";

import WordView from "./WordView";

class WordScreen extends Component {
  static navigationOptions = {
    title: "Word of the Day",
    tabBarLabel: "Word",
    headerStyle: {
      paddingTop: Constants.statusBarHeight,
      height: 60 + Constants.statusBarHeight,
      backgroundColor: "#3F4C6B"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-calendar" : "ios-calendar-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    words: [],
    currentIndex: 1
  };

  //creates a dummy SQLite DB to create the SQLite folder
  async makeSQLiteDirAsync() {
    const dbTest = SQLite.openDatabase("db.db");

    try {
      await dbTest.transaction(tx => tx.executeSql(""));
    } catch (e) {
      console.log("error while executing SQL in dummy DB");
      console.log(e.message);
    }
  }

  async fetchDatabase() {
    try {
      const dbPath = FileSystem.documentDirectory + "ok";

      await this.makeSQLiteDirAsync();

      await FileSystem.downloadAsync(
        "https://github.com/florentroques/expo-remote-sqlite-download/blob/master/Chinook_Sqlite.sqlite?raw=true",
        dbPath
      );
      console.log("Finished downloading o ", dbPath);

      const message = await FileSystem.getInfoAsync(dbPath);
      console.log("info");

      console.log(message);
      console.log("contents");

      // const contents = await FileSystem.readAsStringAsync(message.uri);
      // console.log(contents);
      const db = await SQLite.openDatabase(message.uri);
      console.log("---");
      console.log(db);

      await db.transaction(
        tx => {
          tx.executeSql(
            "select * from main.Album where AlbumId=?",
            [2],
            (_, { rows }) => {
              console.log(JSON.stringify(rows));
            },
            (etx, error) => {
              console.log("execute error");
              console.log(etx);
              console.log(error);
            }
          );
        },
        error => {
          console.log("transaction error");
          console.log(error);
        }
      );
    } catch (error) {
      console.log("other error");
      console.error(error);
    }

    // const dbAsset = new Asset({
    //   'name': 'my_database',
    //   'type': 'db',
    //   // 'hash': '70c1c7e28cb655995950a34c7ccd71b8', // calculate md5 hash here
    //   'uri': 'https://github.com/florentroques/expo-remote-sqlite-download/blob/master/Chinook_Sqlite.sqlite?raw=true', // path to the file somewhere on the internet
    // });

    // const dbAssetFullName = `${dbAsset.name}.${dbAsset.type}`;

    //   await this.makeSQLiteDirAsync();
    //   await dbAsset.downloadAsyncTo(`SQLite/${dbAssetFullName}`);
    //   console.log('dbAsset');
    //   console.log(dbAsset);

    //   const db = SQLite.openDatabase(dbAssetFullName);
    //   console.log('db');
    //   console.log(db);

    //   await db.transaction(tx => {
    //     tx.executeSql(
    //       'select * from Album LIMIT 0, 1',
    //       [],
    //       (_, { rows }) => {
    //         this.setState({ firstRow: JSON.stringify(rows) });
    //         console.log(JSON.stringify(rows));
    //       }
    //     );
    //   });

    // const imageURI = Asset.fromModule(DATABASE).uri;
    // console.log(imageURI);

    // const db = SQLite.openDatabase({
    //   name: "../../../assets/db.db",
    //   cache: false
    // });

    // console.log(db);
    // console.log(db.path);

    // db.transaction(tx => {
    //   tx.executeSql(`select * from words`, [], (_, { rows: { _array } }) => {
    //     console.log(_array);
    //   });
    // });
  }

  async componentDidMount() {
    const dayOfYear = moment().dayOfYear();
    const words = WORD_SET.slice(dayOfYear - 1, dayOfYear + 2);

    this.setState({
      words
    });
  }
  componentWillReceiveProps() {
    const { state } = this.props.navigation;

    if (state && state.params) {
      const { word } = state.params;
      const words = [WORD_SET[word]];
      this.setState({
        words
      });
    }
  }
  render() {
    const { currentIndex } = this.state;
    let { words } = this.state;

    return (
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          index={1}
          loop={false}
          showsPagination={true}
          onIndexChanged={index => {
            this.setState({ currentIndex: index });
          }}
        >
          {words.map((word, i) => (
            <WordView
              key={i}
              index={i}
              focused={i === currentIndex}
              word={word}
            />
          ))}
        </Swiper>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  buttonText: {}
}));

export default WordScreen;
