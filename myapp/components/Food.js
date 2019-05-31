import React from 'react';
import { Platform, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const Food = ({name, description, price, navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('Food', {name, description, price })}>
   <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text>{description}</Text>
    <Text>{price}</Text>
  </View>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: '#fff',
    height: 100
  },
  name: {
    fontWeight: 'bold'
  }
})

export default Food;