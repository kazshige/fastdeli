import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Text, View, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
const backendUrl = "http://localhost:3002/device"

var {height, width} = Dimensions.get('window');
import CartFood from './FoodScreen';

class ScreenCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  componentDidMount(){
    const { state } = this.props.navigation;
    const { params } = state;
    const { cart } = params
    this.setState({
      cart
    })

  }
  isListEmpty = () => {
    const { state } = this.props.navigation;
    const { params } = state;
    const { cart } = params
    return !cart.length

  }

  onEmptyList = () => {
    if(!this.isListEmpty()) return null;
    return (
      <View style={styles.content_empty}>
        <Text>Your cart is empty!</Text>
      </View>
    );
  }

  onPurchase = () => {
    // if(this.props.screenProps.onPurchase)
    //   this.props.screenProps.onPurchase();
  }

  render_button_buy = () => {
    if(this.isListEmpty()) return null;
    return (
      <TouchableOpacity style={styles.button_buy} onPress={this.onPurchase}>
        <Text style={styles.button_addtocart_text}>PLACE ORDER</Text>
      </TouchableOpacity>
    );
  }

  handleDelete = (item) => {
    const uniqId = DeviceInfo.getUniqueID()
    axios.delete(`${backendUrl}/${uniqId}/remove_cart/${item.name}`)
    .then((res)=> {
      const cartList = this.state.cart.filter((cartItem) => cartItem.name !== item.name)

      this.setState({
        cart: cartList
      })
    })
  }

  renderItems = ({ item }) => {
    return (
      <View style={{flex: 1, flexDirection: "row", marginTop: 10, width: width}}>
        <Text style={{color: 'green', fontSize: 20, marginLeft: 10, width: 0.2 * width}}>{item.quantity} X</Text>
        <Text style={{color: 'black', fontSize: 20, marginLeft: 10,  width: 0.3 * width}}>{item.name}</Text>
        <Text style={{color: 'black', fontSize: 20, marginLeft: 10, width: 0.2 * width}}>${item.price * item .quantity}</Text>
        <TouchableOpacity onPress={() => this.handleDelete(item)}>
          <Ionicons style={{ marginTop: 5}} name={'ios-trash'} size={25} color={'red'} />
        </TouchableOpacity>

      </View>
    )
  }

  render() {
    const { cart } = this.state;

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={cart}
            renderItem={this.renderItems}
            contentContainerStyle={[{flexGrow: 1}, !this.isListEmpty() ? null : {justifyContent: 'center'}]}
            ListFooterComponent={this.onEmptyList}
          />
        </View>
        {this.render_button_buy()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flex: 1, backgroundColor: '#00ff00'},
  content: {flex: 11},
  content_empty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button_buy: {
      flex: 0.5,
      alignItems: 'center',
      backgroundColor: 'green'
  },
  button_addtocart_text: {
      color: 'white'
  },
});

export default ScreenCart;