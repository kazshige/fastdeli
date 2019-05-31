import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from './App'
import MenuScreen from './screen/Menu';
import FoodScreen from './screen/FoodScreen';
import CartScreen from './screen/Cart';

const TabNav = createBottomTabNavigator({
  Home: { screen: AppScreen },
  Search: { screen: AppScreen },
  Order: { screen: AppScreen},
  Profile: { screen: AppScreen }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-home';
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
      } else if (routeName === 'Search') {
        iconName = `ios-search`;
      } else if (routeName === 'Order') {
        iconName = `ios-list`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});


const MainNav = createStackNavigator({
  TabNav: { screen: TabNav },
  Menu: {screen: MenuScreen },
  Food: {screen: FoodScreen },
  Cart: {screen: CartScreen }
})

export default createAppContainer(MainNav)
