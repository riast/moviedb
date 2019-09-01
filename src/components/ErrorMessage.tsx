import React from 'react';
import { Text, Badge } from 'react-native-elements';
import { View } from 'react-native';
import * as Colors from '../theme/Colors';
export const ErrorMessage = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      alignItems: 'center',
      height: 30,
    }}>
    <Badge status="error" />
    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: Colors.Error }}>
      There was an error getting movies.
    </Text>
  </View>
);
