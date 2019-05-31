import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
const backendUrl = "http://localhost:3002/device"

var {height, width} = Dimensions.get('window');
class FoodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  componentDidMount(){
    const uniqId = DeviceInfo.getUniqueID();
    axios.get(`${backendUrl}/${uniqId}/cart`)
    .then((response)=> {
      const { cart } = response.data;
      console.log(cart)
      this.setState({cart})
    })
    .catch((error)=> {
      alert(error.message)
    })

  }

  _onProductSelection = () => {
    // if(this.props.onProductSelection) this.props.onProductSelection({
    //   name: this.props.name,
    //   image: this.props.image,
    //   description: this.props.description,
    //   price: this.props.price
    // });
  }
  handleUpdateCart = (item) => {
    const uniqId = DeviceInfo.getUniqueID()
    axios.put(`${backendUrl}/${uniqId}/update_cart`, { item })
    .then((res)=> {
      const cart = [...this.state.cart]
      cart.push(item)
      this.props.navigation.navigate('Cart', {cart: cart})
    })
  }

  handleAddToCart = (cart) => {
    const uniqId = DeviceInfo.getUniqueID()
    axios.post(`${backendUrl}/${uniqId}/add_cart`, { cart: [cart] })
    .then((res)=> {
      const cartList = [...this.state.cart]
      cartList.push(cart)
      this.props.navigation.navigate('Cart', {cart: cartList})
    })
  }

  render() {

    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { name, price, description } = params;

    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{description}</Text>
        </View>

        <View>
          <Text style={styles.name}>${price}</Text>
        </View>

        <View>
        <TouchableOpacity style={styles.button_buy} onPress={() => this.state.cart.length? this.handleUpdateCart({name, price, description, quantity: 5}): this.handleAddToCart({name, price, description, quantity: 5})}>
        <Text style={styles.button_addtocart_text}>ADD TO CART</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button_buy: {
    height: 20,
    marginTop: 0.75 * height,
    alignItems: 'center',
    backgroundColor: 'green'
  },
  button_addtocart_text: {
      color: 'white'
  },
});


export default FoodScreen;