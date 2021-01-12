import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Switch,
  Spinner,
} from 'native-base';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors, isRTL} from '../styles/base';
import {listToggle} from 'GoTaxiApp/store/actions/map';
import * as RootNavigation from '../navigation/RootNavigation.js';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

class GoHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderBackBtn() {
    if (this.props.isBackBtn) {
      return (
        <Button
          transparent
          onPress={() => {
            RootNavigation.pop();
          }}>
          <FontAwesomeIcon
            icon={['fa', isRTL ? 'arrow-right' : 'arrow-left']}
            size={15}
          />
        </Button>
      );
    }
    return null;
  }
  renderDrawerBtn() {
    return (
      <Button
        transparent
        onPress={() => {
          RootNavigation.toggleDrawer();
        }}>
        <FontAwesomeIcon icon={['fa', 'bars']} size={15} />
      </Button>
    );
  }
  render() {
    const {title, isLogo, isBackBtn, isDrawerBtn, flat} = this.props;
    return (
      <Header style={[styles.container, flat ? {elevation: 0} : null]}>
        <Left style={{flex: 1}}>
          {isBackBtn && this.renderBackBtn()}
          {isDrawerBtn && this.renderDrawerBtn()}
        </Left>
        <Body
          style={{
            flex: 1,
            flexGrow: 2,
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {!!title && (
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          )}
          {!!isLogo && (
            <Text numberOfLines={1} style={styles.title}>
              GoTaxi
            </Text>
          )}
        </Body>
        <Right style={{flex: 1}} />
      </Header>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
  },
  title: {
    color: '#000',
    textAlign: 'center',

    width: '100%',
    fontSize: 18,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoHeader);
