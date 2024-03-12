import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import PropTypes from 'prop-types';

const Separator = props => {
  let {height, style} = props;
  style = StyleSheet.flatten(style);
  return (
    <View
      style={[
        {
          height,
          marginHorizontal: 16,
          backgroundColor: colors.separator,
        },
        style,
      ]}
    />
  );
};

export default Separator;

Separator.propTypes = {
  height: PropTypes.number,
  style: PropTypes.any,
};
Separator.defaultProps = {
  height: 1,
};
