import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import Router from './src/Navigations/Router'
import store from "./src/Redux/store"
import { Provider as StoreProvider } from 'react-redux';
import * as Font from 'expo-font';
import { SafeAreaView, Image } from 'react-native';
import { Root } from "native-base";
import { Asset } from 'expo-asset';


const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
  'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
  'NotoSans': require('./assets/fonts/NotoSans-Regular.ttf'),
});

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

async function loadAssetsAsync() {
  const imageAssets = cacheImages([
    'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2Flogin.jpg?alt=media&token=ad2e2cb1-16df-4b0a-b32a-18bd5d2cd93b',
    require('./assets/splash.png'),
    require('./assets/images/card-front.png'),
    require('./assets/images/card-back.png'),
  ]);
  await getFonts();
  await Promise.all([...imageAssets]);
}


const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <>

        <StoreProvider store={store}>
          <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar style='light' hidden={false} translucent={true} />
            <Root>
              <Router />
            </Root>
          </SafeAreaView>
        </StoreProvider>
      </>

    )
  }
  else {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setFontsLoaded(true)}
        onError={console.log}
      />
    )
  }
}

export default App