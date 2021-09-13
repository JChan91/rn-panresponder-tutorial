import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Item = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.itemText}>ITEM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center'
  },

  itemText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default Item;

// style={[
//   styles.pointStyle,
//   {
    // top: parseFloat(locationY - 2),
    // left: parseFloat(locationX - 11),
//   },
// ]}