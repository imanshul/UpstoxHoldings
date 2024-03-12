import React from 'react';
import {Text, View} from 'react-native';
import colors from '../constants/colors';
import PropTypes from 'prop-types';

const Header = props => {
  return (
    <View style={{backgroundColor: colors.primary, padding: 16}}>
      <Text style={{color: colors.secondaryText, fontWeight: 'bold'}}>
        {props.title}
      </Text>
    </View>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
