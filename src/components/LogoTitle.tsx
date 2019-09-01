import React from 'react';
import { View, Image } from 'react-native';
export const LogoTitle = () => (
  <View>
    <Image
      style={{ height: 40, width: 70, resizeMode: 'contain' }}
      source={require('../theme/logo.png')}
    />
  </View>
);
