/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Container, StyleProvider, Root} from 'native-base';

import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Linking,
  Platform,
  AppState,
} from 'react-native';
import {initialize} from './store/actions/auth';
import {initialize as initializeLang} from './store/actions/locale';

import {Provider} from 'react-redux';

import store from './store/index';
import MainStack from './navigation/AppNavigator';
import getTheme from './native-base-theme/components';
import common from './native-base-theme/variables/commonColor';
import {colors} from 'GoTaxiApp/styles/base';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import NetInfo from '@react-native-community/netinfo';
import NetworkPlaceholder from './screens/NetworkPlaceholder';
import * as RootNavigation from 'GoTaxiApp/navigation/RootNavigation.js';

library.add(fas, far);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: true, appState: AppState.currentState};
    this.fetchConnection();
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      if (this.state.isConnected != state.isConnected) {
        this.setState({isConnected: state.isConnected});
        this.initializeApp(state);
      }
    });
  }

  fetchConnection = () => {
    NetInfo.fetch().then(state => {
      this.setState({isConnected: state.isConnected});

      this.initializeApp(state);
    });
  };
  initializeApp = state => {
    if (state) {
      store.dispatch(initializeLang());
      store.dispatch(initialize());
    }
    SplashScreen.hide();
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <SafeAreaView style={{flex: 1}}>
          <Provider store={store}>
            <StyleProvider style={getTheme(common)}>
              <Container>
                {this.state.isConnected ? (
                  <Root>
                    <MainStack usePrefix={'gocardapp://'} />
                  </Root>
                ) : (
                  <NetworkPlaceholder fetchConnection={this.fetchConnection} />
                )}
              </Container>
            </StyleProvider>
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
