// In App.js in a new project

import { observer } from 'mobx-react';
import moment from 'moment';
import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Divider, Icon, Text } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ImagePathW1280, ImagePathW500 } from '../constants/Values';
import { Movie } from '../domains/Movie';
import * as Colors from '../theme/Colors';
import { HeaderStyle } from '../theme/HeaderStyles';
import { FontSizes, Margins } from '../theme/Sizes';
import {
  ReleaseDateSourceFormat,
  ReleaseDateHumanFormat,
  ReleaseDateYearOnlyFormat,
} from '../constants/DateFormats';
import { ImageBannerStyle } from '../theme/CommonStyles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class MovieDetails extends React.Component<Props, any> {
  static navigationOptions = {
    ...HeaderStyle,
    headerTitle: 'Details',
  };

  render() {
    let movie: Movie = this.props.navigation.getParam('movie');

    let hasReleased = moment(movie.release_date, ReleaseDateSourceFormat).isBefore(moment.now());

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />

        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            {/* Banner area */}

            <FastImage
              style={ImageBannerStyle}
              source={{
                uri: ImagePathW1280 + movie.backdrop_path,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ margin: Margins.default }}>
              <Text style={{ fontSize: FontSizes.large }}>{movie.title}</Text>

              <Text>
                {moment(movie.release_date, ReleaseDateSourceFormat).format(
                  ReleaseDateYearOnlyFormat,
                )}
              </Text>
            </View>
            <Divider></Divider>
            {/* Release date and rating area */}

            <View style={styles.releaseSection}>
              <View style={{ flex: 0.5 }}>
                {hasReleased && <Text style={{ fontSize: FontSizes.medium }}>Released</Text>}
                {!hasReleased && <Text style={{ fontSize: FontSizes.medium }}>Coming Soon</Text>}

                <Text>
                  {moment(movie.release_date, ReleaseDateSourceFormat).format(
                    ReleaseDateHumanFormat,
                  )}
                </Text>
              </View>

              <View style={styles.rating}>
                <Icon containerStyle={styles.starIconContainer} color="red" name="star"></Icon>
                <Text>{movie.vote_average}/10</Text>
              </View>
            </View>
            <Divider></Divider>

            {/* Poster and overview area */}

            <View style={styles.posterSection}>
              <FastImage
                style={styles.posterImage}
                source={{
                  uri: ImagePathW500 + movie.poster_path,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.overviewText}>{movie.overview}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.Generic.white,
    height: '100%',
  },
  body: {
    backgroundColor: Colors.Generic.white,
  },
  releaseSection: {
    flex: 1,
    margin: Margins.default,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  rating: { alignItems: 'flex-end', flex: 0.5 },
  starIconContainer: { width: 40, justifyContent: 'center' },
  posterSection: { flexDirection: 'row', margin: Margins.default, flex: 1 },
  posterImage: { height: 200, width: 130 },
  overviewText: { marginLeft: Margins.default, flex: 1, textAlign: 'left' },
});
