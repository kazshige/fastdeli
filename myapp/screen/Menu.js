import React from 'react';
import {Image, View, ScrollView, StyleSheet, Animated, Text} from 'react-native';
import { Food, Tag } from '../components';

class FoodMenu extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.scroll = new Animated.Value(0)
  }

  render() {
    const headerContainerWidth = this.scroll.interpolate({
      inputRange: [0, 125],
      outputRange: ['90%', '100%'],
      extrapolate: 'clamp'
    })

    const imageContainerHeight = this.scroll.interpolate({
      inputRange: [-200, 0],
      outputRange: [450, 250],
      extrapolate: 'extend'
    })

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, { height: imageContainerHeight }]}>
          <Image style={styles.image} source={{ uri: 'https://www.thespruceeats.com/thmb/4QUIYqDCxzubLJmYFDwgr9GgBBk=/1333x1000/smart/filters:no_upscale()/terris-crispy-fried-chicken-legs-3056879-10_preview-5b05ec40a474be00362260d7.jpeg' }} />
        </Animated.View>
        <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          style={styles.scrollViewContainer}
        >
          <View style={styles.contentContainer}>
            <Food name="2 Piece Chicken Meal" description="2 pcs chicken, 1 regular fries, 1 drink" price={10}  navigation={this.props.navigation}/>
            <Food name="3 Piece Chicken Meal" description="3 pcs chicken, 1 regular fries, 1 drink" price={14} navigation={this.props.navigation} />
            <Food name="6 Piece Chicken Meal" description="6 pcs chicken, 1 large fries, 2 drinks" price={18} navigation={this.props.navigation} />
            <Food name="8 Piece Family Chicken Meal" description="8 pcs chicken, 1 large fries, 2 drinks" price={22} navigation={this.props.navigation} />
            <Food name="12 Piece Family Chicken Meal" description="12 pcs chicken, 2 large fries, 2 drinks" price={24} navigation={this.props.navigation} />
            <Food name="16 Piece Family Chicken Meal" description="16 pcs chicken, 2 large fries, 2 drinks" price={28} navigation={this.props.navigation} />
            <Food name="Creamy potato salad" description="very wonderful meal" price={8} navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

// Sticky header is not used for demo because of the style issue
// <View style={styles.stickyHeaderContainer}>
// <Text style={styles.title}> Mr Fried Chiken (Bay Area)</Text>
// <Text style={styles.description}>$$ . American</Text>
// <View style={styles.tagContainer}>
//   <Tag>15-20 min</Tag>
//   <Tag>4.5 (500+)</Tag>
// </View>
// <Animated.View style={[styles.headerContainer, { width: headerContainerWidth }]}></Animated.View>
// </View>

export default FoodMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  scrollViewContainer: {
    flex: 1
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  },
  stickyHeaderContainer: {
    position: 'absolute',
    top: 125,
    left: 0,
    right: 0
  },
  headerContainer: {
    width: '90%',
    height: 150,
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  contentContainer: {
    marginTop: 290,
    backgroundColor: '#eee'
  },
  image: {
    flex: 1
  },
  item: {
    margin: 10,
    backgroundColor: '#fff',
    height: 100
  },
  title: {
    fontSize: 16,
    marginTop: 10
  },
  description: {
    color: '#999',
    marginTop: 5
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15
  }
})