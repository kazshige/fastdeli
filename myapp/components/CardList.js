import React, {Component} from 'react';
import {Platform, StyleSheet,FlatList, View, Image} from 'react-native';
import Card from './Card';


type Props = {};
export default class CardList extends Component<Props> {
  render() {
    return (
     <FlatList
     style={{marginTop: 50}}
     keyExtractor={(item)=> item.toString()}
     horizontal={true}
     data={[1,2,3,4,5,6,7]}
     renderItem={({ item }) => <Card navigation={this.props.navigation}/>}
     showsHorizontalScrollIndicator={false}
     />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
