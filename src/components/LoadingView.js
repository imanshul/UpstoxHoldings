import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const LoadingView = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}>
      <ActivityIndicator size={'small'} />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingView;
