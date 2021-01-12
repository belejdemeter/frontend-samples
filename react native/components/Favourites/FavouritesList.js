import React, {Component, useState} from 'react';
import {List, Button, Text, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import {colors} from '../../styles/base';
class FavouritesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <List
        showsHorizontalScrollIndicator={false}
        horizontal
        dataArray={this.props.data}
        keyExtractor={(_, index) => index}
        renderRow={item => (
          <FavouriteItem
            {...item}
            handlePress={() => this.props.onItemClick(item.place)}
          />
        )}
      />
    );
  }
}
function FavouriteItem(props) {
  // const [isDeleteBtn, setIsDeleteBtn] = useState(false);
  return (
    <Button small info rounded style={styles.item} onPress={props.handlePress}>
      <Text style={{color: '#000'}}>{props.name}</Text>
      {/* {isDeleteBtn && (
        <Icon
          type="FontAwesome5"
          style={{color: colors.primary, fontSize: 12}}
          name="trash"
        />
      )} */}
    </Button>
  );
}
const styles = StyleSheet.create({
  item: {marginHorizontal: 2, marginVertical: 3},
});
export default FavouritesList;
