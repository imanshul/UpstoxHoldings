import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Holdings from './src/screens/Holdings';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={[backgroundStyle, {flex: 1, backgroundColor: 'white'}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <Holdings />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;
