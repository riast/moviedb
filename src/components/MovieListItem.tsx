import React from 'react';
import { Text, Card } from 'react-native-elements';
import { ImagePathW500 } from '../constants/Values';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { Movie } from '../domains/Movie';
import NavigationHelper from '../helpers/NavigationHelper';
import { ReleaseDateSourceFormat, ReleaseDateHumanFormat } from '../constants/DateFormats';
export const MovieListItem = ({ item }: { item: Movie }) => (
  <TouchableOpacity
    onPress={() => {
      /* 1. Navigate to the Details route with params */
      NavigationHelper.navigate('MovieDetails', {
        movie: item,
      });
    }}>
    <Card
      title={item.title}
      key={item.id + ''}
      containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
      dividerStyle={{ marginBottom: 0 }}>
      <FastImage
        style={{ height: 200, flex: 1 }}
        source={{
          uri: ImagePathW500 + item.backdrop_path,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text style={{ marginBottom: 5, marginTop: 15, textAlign: 'center' }}>
        {moment(item.release_date, ReleaseDateSourceFormat).format(ReleaseDateHumanFormat)}
      </Text>
    </Card>
  </TouchableOpacity>
);
