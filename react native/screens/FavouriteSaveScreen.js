import React, {Component} from 'react';
import {
  Content,
  Text,
  Icon,
  Item,
  Input,
  List,
  ListItem,
  Body,
  Right,
  Button,
  Form,
} from 'native-base';
import {StyleSheet, View, Alert} from 'react-native';
import {colors, shadow, isRTL} from '../styles/base';
import {connect} from 'react-redux';
import _ from 'lodash';
import Loader from '../components/Loader';
import Map from '../components/Map';
import LocationMarker from '../components/Map/LocationMarker';
import trans from 'GoTaxiApp/store/helpers/trans';
import {saveToFavourite} from '../store/actions/favourite';
class FavouriteSaveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {name: null};
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.map) {
        let location = _.get(this.props.route, 'params.location', null);
        let lat = _.get(location, 'lat', null);
        let lon = _.get(location, 'lon', null);

        this.map.moveToMarker(parseFloat(lat), parseFloat(lon));
      }
    }, 50);
  }
  handleChangeTitle = name => this.setState({name});
  submit = () => {
    let place = _.get(this.props.route, 'params.location', null);
    let name = this.state.name;

    this.props.saveToFavourite(name, place).then(() => {
      Alert.alert('Favourite', 'Place successfully saved to favourite', [
        {
          text: 'Ok',
          onPress: () => this.props.navigation.pop(),
        },
      ]);
    });
  };
  render() {
    let location = _.get(this.props.route, 'params.location', null);
    let name = _.get(location, 'name', null);
    let city = _.get(location, 'address.city', null);
    let displayName = _.get(location, 'display_name', null);
    let lat = _.get(location, 'lat', null);
    let lon = _.get(location, 'lon', null);
    return (
      <Content style={styles.container}>
        <View style={styles.mapContainer}>
          <Map ref={ref => (this.map = ref)}>
            <LocationMarker
              type="dropoff"
              lat={parseFloat(lat)}
              lon={parseFloat(lon)}
            />
          </Map>
          <View style={styles.addressContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {name ? name : city}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {displayName}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Form>
            <Item regular style={styles.inputContainer}>
              <Input
                style={styles.input}
                placeholder={trans(
                  'taxi.favourite_name_placeholder',
                  null,
                  'Name location to save like Home, Work, Gym etc.',
                )}
                onChangeText={this.handleChangeTitle}
              />
            </Item>
          </Form>

          <Button style={{marginTop: 30}} block rounded onPress={this.submit}>
            <Text>{trans('taxi.favourite_save_btn', null, 'Save')}</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.favourite.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveToFavourite: (name, place) => dispatch(saveToFavourite(name, place)),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  mapContainer: {
    overflow: 'hidden',
    marginBottom: 20,

    height: 230,
    ...shadow,
    borderRadius: 20,
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: colors.third,
    borderColor: 'transparent',
    height: 40,
  },
  input: {fontSize: 12, color: colors.text},
  contentContainer: {
    flex: 1,
  },
  addressContainer: {
    backgroundColor: '#fff',
    marginTop: 'auto',
    padding: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    width: '100%',
  },
  subtitle: {
    fontSize: 13,
    color: colors.text,
    width: '100%',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteSaveScreen);
