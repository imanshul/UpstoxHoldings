import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutAnimation, StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Row from './Row';
import Strings from '../constants/Strings';
import PropTypes from 'prop-types';
import Utils from '../constants/Utils';

const HoldingsBottomSheet = ({data}) => {
  // Bottom sheet data
  const [snapIndex, setSnapIndex] = useState(0);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['8.5%', '25%'];
  const handleSheetChanges = useCallback(index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSnapIndex(index);
  }, []);

  const {totalInvestment, totalCurrentValue, todayPNL, totalPL} =
    useMemo(() => {
      let totalInvestment = 0;
      let totalCurrentValue = 0;
      let todayPNL = 0;
      let totalPL = 0;

      if (Utils.isArrayAndNotNull(data)) {
        // Calculate total investment
        totalInvestment = data.reduce(
          (total, holding) => total + holding.avgPrice * holding.quantity,
          0,
        );

        // Calculate total current value
        totalCurrentValue = data.reduce(
          (total, holding) => total + holding.ltp * holding.quantity,
          0,
        );

        // Calculate total PNL
        totalPL = totalCurrentValue - totalInvestment;

        // Calculate today's PNL
        todayPNL = data.reduce(
          (total, holding) =>
            total + (holding.close - holding.ltp) * holding.quantity,
          0,
        );
      }

      return {totalInvestment, totalCurrentValue, todayPNL, totalPL};
    }, [data]);

  const renderBottomSheetView = () => {
    return (
      <>
        {snapIndex === 0 ? (
          <Row
            leftText={Strings.holdings.profit_loss}
            rightText={Utils.getFormattedNumber(totalPL)}
          />
        ) : (
          <>
            <Row
              leftText={Strings.holdings.current_value}
              rightText={Utils.getFormattedNumber(totalCurrentValue)}
            />
            <Row
              leftText={Strings.holdings.total_investment}
              rightText={Utils.getFormattedNumber(totalInvestment)}
              style={{marginTop: 8}}
            />
            <Row
              leftText={Strings.holdings.today_p_l}
              rightText={Utils.getFormattedNumber(todayPNL)}
              style={{marginTop: 8}}
            />
            <Row
              leftText={Strings.holdings.profit_loss}
              rightText={Utils.getFormattedNumber(totalPL)}
              style={{marginTop: 24}}
            />
          </>
        )}
      </>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={0}>
      <BottomSheetView style={styles.contentContainer}>
        {renderBottomSheetView()}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default HoldingsBottomSheet;

HoldingsBottomSheet.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
