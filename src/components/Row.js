import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const Row = props => {
  let {style, leftText, leftTextStyle, rightText, rightTextStyle} = props;
  style = StyleSheet.flatten(style);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        style,
      ]}>
      <Text
        style={[
          {color: colors.primaryTextDark, fontWeight: 'bold'},
          leftTextStyle,
        ]}>
        {leftText}
      </Text>
      <Text style={[{color: colors.primaryTextDark}, rightTextStyle]}>
        {rightText}
      </Text>
    </View>
  );
};

export default Row;

Row.propTypes = {
  style: PropTypes.any,
  leftText: PropTypes.string,
  leftTextStyle: PropTypes.any,
  rightText: PropTypes.string,
  rightTextStyle: PropTypes.any,
};
Row.defaultProps = {};
