import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ScreenState } from '../utils/state';

const { height, width } = Dimensions.get('window');

const Header = (props) => {
  const [value, setValue] = useState('select');
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>NoteBook</Text>
      <Picker
        selectedValue={value}
        style={{
          height: 50,
          width: 150,
          backgroundColor: '#b9e4c9',
          marginTop: 15,
          marginRight: 20,
        }}
        onValueChange={(itemValue, itemIndex) => {
          if (props.headerpicker === 'yes') {
            if (itemValue === 'select') {
              console.warn('Please Select Options Below!');
            }
            // setValue(itemValue);
            props.func({ s: itemValue });
          } else if (props.headerpicker === 'no') {
            console.warn('Login or Signin first!');
          }
        }}
      >
        <Picker.Item label="--Select--" value="select" />
        <Picker.Item label="Home" value="HOME" />
        <Picker.Item label="Profile" value="PROFILE" />
        <Picker.Item label="Clear All Notes" value="CLEAR_ALL" />
        <Picker.Item label="Logout" value="LOGOUT" />
      </Picker>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '12%',
    backgroundColor: '#013220',
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Title: {
    color: '#b9e4c9',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
  },
});
