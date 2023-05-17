import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  BackHandler,
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { ScreenState } from '../utils/state';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = (props) => {
  const [username, setUsername] = useState(props.user);
  const [password, setPassword] = useState(props.pw);
  const [showhide, setShowHide] = useState('show');
  const [showpass, setShowpass] = useState(true);

  savechangeinfo = async () => {
    if (username === '') {
      console.warn('Username is Empty');
    } else if (password === '') {
      console.warn('Password is Empty');
    } else if (password.length < 5) {
      console.warn('Password length is less than 5');
    } else {
      try {
        await AsyncStorage.getItem(username).then(async (d) => {
          if (d === null) {
            await AsyncStorage.setItem(
              username,
              JSON.stringify({ pw: password, nt: [] })
            );
            await AsyncStorage.removeItem(props.user);
            props.func({ s: ScreenState.home, u: username, p: password });
          } else {
            console.warn('Username Already in use!!');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function backAction() {
        props.func({ s: ScreenState.home, u: props.user, p: props.pw });
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <View style={styles.Container}>
        <Text style={styles.Label}>Profile Screen</Text>
        <View style={{ marginTop: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Your Userame</Text>
          </View>
          <TextInput
            style={styles.Input}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Text style={{ fontSize: 20 }}>Your Password</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.Input}
              secureTextEntry={showpass}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <View
              style={{
                height: '80%',
                alignItems: 'center',
                marginTop: '6%',
                marginLeft: '2%',
              }}
            >
              <Button
                title={showhide}
                onPress={() => {
                  if (showpass == true) {
                    setShowHide('hide');
                    setShowpass(false);
                  } else {
                    setShowHide('show');
                    setShowpass(true);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.Subcontainer}>
        <Button
          title="Save Info"
          onPress={() => {
            savechangeinfo();
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#356859',
    alignItems: 'center',
  },
  Label: {
    fontSize: 40,
    color: '#b9e4c9',
    marginTop: 20,
  },
  Input: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#b9e4c9',
  },
  Subcontainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-evenly',
  },
});
