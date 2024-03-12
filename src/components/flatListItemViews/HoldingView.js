import React from 'react';
import {View} from 'react-native';
import Utils from '../../constants/Utils';
import Separator from '../Separator';
import PropTypes from 'prop-types';
import Row from '../Row';

const HoldingView = props => {
  const {item, index, lastIndex} = props;
  const currentValue = item.ltp * item.quantity;
  const investmentValue = item.avgPrice * item.quantity;
  return (
    <>
      <View
        style={{
          padding: 16,
          backgroundColor: 'white',
        }}>
        <Row leftText={item.symbol} rightText={`LTP: ${item.ltp}`} />
        <Row
          leftText={item?.quantity?.toString()}
          leftTextStyle={{fontWeight: 'normal'}}
          rightText={`P/L: ${Utils.getFormattedNumber(
            currentValue - investmentValue,
          )}`}
          style={{marginTop: 4}}
        />
      </View>
      {index !== lastIndex && <Separator />}
    </>
  );
};

export default HoldingView;

HoldingView.propTypes = {
  item: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
};
