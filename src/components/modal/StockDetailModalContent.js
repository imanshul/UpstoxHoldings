import React from 'react';
import {View} from 'react-native';
import Row from '../Row';
import Strings from '../../constants/Strings';
import Utils from '../../constants/Utils';
import Separator from '../Separator';

const StockDetailModalContent = ({data}) => {
  const currentValue = data.ltp * data.quantity;
  const investmentValue = data.avgPrice * data.quantity;
  const dayPL = (data.close - data.ltp) * data.quantity;
  return (
    <View style={{padding: 16}}>
      <Row
        leftText={data.symbol}
        rightText={Utils.getFormattedNumber(data.ltp)}
      />
      <Separator height={4} style={{marginHorizontal: -16, marginTop: 8}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#e0cde0',
          marginHorizontal: -16,
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}>
        <Row
          leftText={Strings.holdings.net_qty}
          leftTextStyle={{fontWeight: 'normal', color: 'purple'}}
          rightText={data.quantity?.toString()}
          rightTextStyle={{fontSize: 12}}
          style={{
            marginTop: 8,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        />
        <Row
          leftText={Strings.holdings.day_p_l}
          leftTextStyle={{fontWeight: 'normal', color: 'purple'}}
          rightText={Utils.getFormattedNumber(dayPL)}
          rightTextStyle={{fontSize: 12}}
          style={{marginTop: 8, flexDirection: 'column', alignItems: 'center'}}
        />
        <Row
          leftText={Strings.holdings.p_l}
          leftTextStyle={{fontWeight: 'normal', color: 'purple'}}
          rightText={Utils.getFormattedNumber(currentValue - investmentValue)}
          rightTextStyle={{fontSize: 12}}
          style={{marginTop: 8, flexDirection: 'column', alignItems: 'center'}}
        />
      </View>
      <Row
        leftText={Strings.holdings.avg_price}
        leftTextStyle={{fontWeight: 'normal'}}
        rightTextStyle={{fontWeight: 'bold'}}
        rightText={Utils.getFormattedNumber(data.avgPrice)}
        style={{marginTop: 8}}
      />
      <Row
        leftText={Strings.holdings.current_value}
        leftTextStyle={{fontWeight: 'normal'}}
        rightTextStyle={{fontWeight: 'bold'}}
        rightText={Utils.getFormattedNumber(currentValue)}
        style={{marginTop: 8}}
      />
      <Row
        leftText={Strings.holdings.total_investment}
        leftTextStyle={{fontWeight: 'normal'}}
        rightTextStyle={{fontWeight: 'bold'}}
        rightText={Utils.getFormattedNumber(investmentValue)}
        style={{marginTop: 8}}
      />
    </View>
  );
};

export default StockDetailModalContent;
