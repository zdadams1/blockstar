import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default class Piece extends Component {
  translateX = new Animated.Value(0);
  translateY = new Animated.Value(0);
  handleGesture = Animated.event(
    [
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY
        }
      }
    ],
    { useNativeDriver: true }
  );

  render() {
    let squareTransformStyle;
    squareTransformStyle = {
      transform: [
        {
          translateY: this.translateY
        },
        {
          translateX: this.translateX
        }
      ]
    };
    return (
      <View style={[styles.container]}>
        <PanGestureHandler onGestureEvent={this.handleGesture}>
          <Animated.View style={[styles.square, squareTransformStyle]} />
        </PanGestureHandler>
      </View>
    );
  }
}

const colors = ['red', 'blue', 'green'];

let color = Math.floor(Math.random() * colors.length);

let styles = StyleSheet.create({
  square: {
    width: 50,
    height: 50,
    backgroundColor: 'green'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});
