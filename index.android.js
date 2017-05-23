/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps'
import Polyline from 'polyline'

export default class client extends Component {
  constructor() {
    super()

    debugger;
    this.state = {
      coordinates: []
    }
  }

  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyAI0Q675P0ijWtf1Cpk8pZTzgb9NL7MAGg').catch((err) => {debugger})
      .then((response) => response.json())
      .then((response) => {
        const steps = Polyline.decode(response.routes[0].overview_polyline.points)

        const coordinates = steps.map((element) => {
          const latitude = parseFloat(element[0])
          const longitude = parseFloat(element[1])

          return {latitude, longitude}
        })

        this.setState({coordinates})
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello world
        </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 45.5581968,
            longitude: -73.8516452,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/*<MapView.Polyline*/}
            {/*coordinates={this.state.coordinates}*/}
            {/*strokeWidth={2}*/}
            {/*strokeColor="red"*/}
          {/*/>*/}
          {/*<MapView.Circle center={{latitude:  37.78825, longitude: -122.4324}} radius={700} />*/}
          {/*{this.renderPolyline()}*/}
        </MapView>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'gray',
  },
  map: {
    ...StyleSheet.absoluteFillObject
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

AppRegistry.registerComponent('client', () => client);
