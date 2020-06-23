import React, { PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import Matter from 'matter-js';
import { registerRootComponent } from 'expo';
import { GameEngine } from 'react-native-game-engine';
import Floor from './Floor';
// import Physics, { resetTiles } from './Physics'
import Constants from './Constants';
import Images from './assets/Images';
import Container from './Container';
import Piece from './Piece';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      score: 0
    };

    this.GameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.0;

    let pieces = [];

    let container = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 145,
      Constants.MAX_WIDTH + 4,
      90,
      { isStatic: true }
    );

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 75,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [floor, container]);

    return {
      // physics: { engine: engine, world: world },
      container: { body: container, renderer: Container },
      floor: { body: floor, renderer: Floor }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode='stretch'
        />
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          // systems={[Physics]}
          running={this.state.running}
          entities={this.entities}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <Text style={styles.score}>{this.state.score}</Text>
        <View style={styles.row}>
          <Piece />
          <Piece />
          <Piece />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  gameOverText: {
    color: 'white',
    fontSize: 48
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 25,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2
  },
  row: {
    flexDirection: 'row',
    bottom: 100,
    position: 'absolute',
    backgroundColor: 'black'
  }
});

registerRootComponent(App);
