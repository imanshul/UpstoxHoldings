import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getHoldingsData} from '../redux/apiReduxMiddleware/investmentMiddleware';
import {resetHoldingsAPIData} from '../redux/slices/investmentSlice';
import LoadingView from '../components/LoadingView';
import Utils from '../constants/Utils';
import StockListView from '../components/flatListItemViews/StockListView';
import Header from '../components/Header';
import Strings from '../constants/Strings';
import HoldingsBottomSheet from '../components/HoldingsBottomSheet';
import useModal from '../hooks/useModal';
import HoldingsDetailModalContent from '../components/modal/HoldingsDetailModalContent';

const Holdings = () => {
  const {holdingsAPIData} = useSelector(state => state.investment);
  const {isLoading, payload, error} = holdingsAPIData;
  const dispatch = useDispatch();

  const HoldingModals = {
    StockDetails: 'StockDetailsView',
  };
  const {showModal, hideModal, ModalWrapper} = useModal();

  useEffect(() => {
    //Fetch data from API
    dispatch(getHoldingsData());

    return () => {
      //remove data from global state
      dispatch(resetHoldingsAPIData());
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
      <Header title={Strings.holdings.title} />
      {Utils.isArrayAndNotNull(payload?.userHolding) && (
        <FlatList
          data={payload?.userHolding}
          renderItem={({item, index}) => (
            <StockListView
              item={item}
              index={index}
              lastIndex={payload?.userHolding?.length - 1}
              onItemClick={item => {
                showModal(HoldingModals.StockDetails, item);
              }}
            />
          )}
          contentContainerStyle={{backgroundColor: 'white'}}
        />
      )}

      {error && <Text style={{textAlign: 'center'}}>{error}</Text>}

      {isLoading && <LoadingView />}

      {Utils.isArrayAndNotNull(payload?.userHolding) && (
        <HoldingsBottomSheet data={payload?.userHolding} />
      )}

      <ModalWrapper modalId={HoldingModals.StockDetails}>
        <HoldingsDetailModalContent />
      </ModalWrapper>
    </View>
  );
};

export default Holdings;
