import React, {Component, useState} from 'react';
import {
  List,
  Button,
  Text,
  Icon,
  ListItem,
  Left,
  Body,
  Right,
} from 'native-base';
import {StyleSheet, FlatList, View, Dimensions} from 'react-native';
import {colors} from '../../styles/base';
import _ from 'lodash';
class FavouritesExtendedList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={() => (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Looks like you haven`t saved locations
            </Text>
          </View>
        )}
        renderItem={({item}) => (
          <FavouriteItem
            {...item}
            handlePress={() => this.props.onItemClick(item.place)}
            handleDelete={() => this.props.onItemDelete(item.name)}
          />
        )}
      />
    );
  }
}
function FavouriteItem(props) {
  let location = _.get(props, 'place.display_name', null);
  return (
    <ListItem onPress={props.handlePress}>
      <Body>
        <Text>{props.name}</Text>
        <Text numberOfLines={1} note style={styles.location}>
          {location}
        </Text>
      </Body>
      <Right>
        <Button small transparent icon onPress={props.handleDelete}>
          <Icon
            type="FontAwesome5"
            name="heart"
            solid
            style={{color: colors.primary}}
          />
        </Button>
      </Right>
    </ListItem>
  );
}
const styles = StyleSheet.create({
  item: {marginHorizontal: 2, marginVertical: 3},
  location: {textAlign: 'left'},
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 100,
  },
  placeholderText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15,
  },
});
export default FavouritesExtendedList;
