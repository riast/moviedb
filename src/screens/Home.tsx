// In App.js in a new project

import React, { Fragment, Component } from 'react';

import { Button, Icon } from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';

import { observer } from 'mobx-react';

import * as Colors from '../theme/Colors';
import { MovieViewModel } from '../viewmodels/MoviesViewModel';
import { MovieListItem } from '../components/MovieListItem';
import { LogoTitle } from '../components/LogoTitle';
import { ErrorMessage } from '../components/ErrorMessage';
import { HeaderStyleWithLogo } from '../theme/HeaderStyles';

@observer
export default class Home extends React.Component<any, any> {
  static navigationOptions = {
    ...HeaderStyleWithLogo,
    headerTitle: 'Discover',
    headerRight: <Icon name="account-box" size={35} containerStyle={{ width: 60 }}></Icon>,
  };

  componentDidMount = () => {
    MovieViewModel.getFirstPageMovies();
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />

        <SafeAreaView style={styles.body}>
          {MovieViewModel.error && <ErrorMessage></ErrorMessage>}
          <FlatList
            onRefresh={MovieViewModel.getFirstPageMovies}
            refreshing={MovieViewModel.refreshing}
            keyExtractor={(item, index) => item.id + ''}
            renderItem={MovieListItem}
            data={MovieViewModel.Movies}
            onEndReachedThreshold={5}
            onEndReached={MovieViewModel.getNextPageOfMovies}></FlatList>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.Generic.white,
  },
});
