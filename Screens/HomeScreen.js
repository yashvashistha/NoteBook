import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { ScreenState } from '../utils/state';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const HomeScreen = ({ func }) => {
  useEffect;
  return (
    <View style={styles.Parentcontainer}>
      <Text style={styles.Label}>Home Screen</Text>
      <View style={styles.Container}>
        <Pressable onPress={() => func({ s: ScreenState.addnote })}>
          <View style={styles.Subcontainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Add New Notes
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => func({ s: ScreenState.viewallnote })}>
          <View style={styles.Subcontainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              View All Notes
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Parentcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Subcontainer: {
    marginTop: 50,
    backgroundColor: '#34A559',
    width: width - 100,
    margin: 10,
    height: height - 850,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  Text: {
    color: '#b9e4c9',
    fontSize: 60,
    fontWeight: 'bold',
  },
  Label: {
    color: '#b9e4c9',
    marginTop: 50,
    fontSize: 40,
  },
});
