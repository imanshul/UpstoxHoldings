import React, {useCallback, useState} from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Utils from '../constants/Utils';
import colors from '../constants/colors';
import Separator from '../components/Separator';

const useModal = () => {
  const [modals, setModals] = useState({});

  const showModal = useCallback((modalId, data = null) => {
    InteractionManager.runAfterInteractions(() => {
      setModals(prevModals => ({
        ...prevModals,
        [modalId]: {isVisible: true, data},
      }));
    });
  }, []);

  const hideModal = useCallback(modalId => {
    setModals(prevModals => ({
      ...prevModals,
      [modalId]: {isVisible: false, data: null},
    }));
  }, []);

  const ModalContent = ({
    title,
    style,
    showCloseButton,
    onClose,
    data,
    children,
  }) => (
    <View
      style={[
        styles.modalContainer,
        {backgroundColor: colors.background},
        {maxHeight: Utils.getDeviceHeight() - 32},
        style,
      ]}>
      {title ? (
        <View
          style={[
            styles.modalHeader,
            {borderBottomColor: colors.primaryTextDark},
          ]}>
          <Text style={[styles.title, {color: colors.primaryTextDark}]}>
            {title}
          </Text>
        </View>
      ) : (
        <Separator
          height={4}
          style={{
            borderRadius: 8,
            width: 32,
            backgroundColor: colors.separator,
            alignSelf: 'center',
            marginTop: 8,
          }}
        />
      )}
      {data
        ? React.Children.map(children, child =>
            React.cloneElement(child, {data}),
          )
        : children}
    </View>
  );

  const ModalWrapper = ({
    modalId,
    style,
    title,
    showCloseButton = true,
    onCloseCallback,
    children,
  }) => {
    const modalData = modals[modalId] || {isVisible: false};
    return (
      <Modal
        isVisible={modalData.isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        scrollOffsetMax={300}
        swipeDirection={'down'}
        swipeThreshold={50}
        propagateSwipe
        onSwipeComplete={() => {
          console.log('swipe');
          hideModal(modalId);
        }}
        transparent={true}
        onBackdropPress={() => hideModal(modalId)}
        onRequestClose={() => hideModal(modalId)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <ModalContent
          style={style}
          title={title}
          showCloseButton={showCloseButton}
          data={modalData.data}
          onClose={() => {
            hideModal(modalId);
            onCloseCallback && onCloseCallback();
          }}>
          {children}
        </ModalContent>
      </Modal>
    );
  };

  // PropTypes for ModalWrapper component
  ModalWrapper.propTypes = {
    modalId: PropTypes.string.isRequired,
    title: PropTypes.string,
    onCloseCallback: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  return {
    showModal,
    hideModal,
    ModalWrapper,
  };
};

const styles = StyleSheet.create({
  title: {fontWeight: 'bold'},
  modalContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.7,
  },
});

export default useModal;
