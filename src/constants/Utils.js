import Strings from './Strings';
import {Platform} from 'react-native';

const Utils = {
  isDevBuild() {
    return __DEV__;
  },

  isAndroid() {
    return Platform.OS === 'android';
  },

  isArrayAndNotNull(myValue) {
    return myValue !== null && Array.isArray(myValue) && myValue.length > 0;
  },

  getFormattedNumber(num, symbol = Strings.common.indian_currency) {
    if (!num || isNaN(num)) {
      num = 0;
    }
    let formattedNum = num % 1 !== 0 ? num.toFixed(2) : num;
    let parts = formattedNum.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
    return symbol + ' ' + parts.join('.');
  },
};
export default Utils;
