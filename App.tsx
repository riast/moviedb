/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'mobx-react';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';
import { MovieViewModel } from './src/viewmodels/MoviesViewModel';
import MovieDetails from './src/screens/MovieDetails';
import NavigationHelper from './src/helpers/NavigationHelper';

export default class App extends React.Component {
  render() {
    MovieViewModel.init();

    const AppNavigator = createStackNavigator(
      {
        Home: {
          screen: Home,
        },
        MovieDetails: {
          screen: MovieDetails,
        },
      },
      {
        initialRouteName: 'Home',
      },
    );

    const AppContainer = createAppContainer(AppNavigator);

    return (
      <ThemeProvider>
        <AppContainer
          ref={(navigatorRef) => {
            NavigationHelper.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeProvider>
    );
  }
}
