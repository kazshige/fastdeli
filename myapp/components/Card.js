import React from 'react';
import { Platform, View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Tag from './Tag';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.heartSize = new Animated.Value(1);
    this.state = {
      liked: false
    }
  }
  // Set the Like button on
  like() {
    this.setState({ liked: true })
    Animated.spring(this.heartSize, {
      toValue: 1.1,
      friction: 1
    }).start()
  }
  // Set the Like button off
  unlike() {
    this.setState({ liked: false })
    this.heartSize.setValue(1)
  }

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Menu')}>
          <View style={styles.container}>
            <View>
              <Image style={styles.image} source={{ uri: 'https://www.thespruceeats.com/thmb/4QUIYqDCxzubLJmYFDwgr9GgBBk=/1333x1000/smart/filters:no_upscale()/terris-crispy-fried-chicken-legs-3056879-10_preview-5b05ec40a474be00362260d7.jpeg' }} />
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
                onPress={() => this.state.liked ? this.unlike() : this.like()}
                style={styles.iconContainer}
              >
                <Animated.View style={{ transform: [{ scale: this.heartSize }] }}>
                  <Ionicons
                    name={(Platform.OS === 'ios' ? 'ios-heart' : 'md-heart') + (this.state.liked ? '' : '-empty')}
                    size={32}
                    color="pink"
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Mr Fried Chiken (Bay Area)</Text>
            <Text style={styles.description}>$$ . American</Text>
            <View style={styles.tagContainer}>
              <Tag>15-20 min</Tag>
              <Tag>4.5 (500+)</Tag>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  image: {
    height: 150
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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