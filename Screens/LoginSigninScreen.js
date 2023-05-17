import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { EntryState } from '../utils/entry';
import { ScreenState } from '../utils/state';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSigninScreen = ({ func }) => {
  const [entry, setEntry] = useState(EntryState.login);
  let content;

  function mainfunc(p) {
    let alldata;
    AsyncStorage.getItem(p.u)
      .then((d) => {
        if (d === null) {
          alldata = { pw: p.p, nt: [] };
        } else {
          alldata = { pw: p.p, nt: JSON.parse(d).nt };
        }
        AsyncStorage.setItem(p.u, JSON.stringify(alldata));
        func({ s: p.s, u: p.u, p: p.p });
      })
      .catch((err) => {
        console.warn('Error! Please try again.');
      });
  }

  if (entry === EntryState.login) {
    content = (
      <Login
        loginfunc={(data) => {
          if (data.s === EntryState.login || data.s === EntryState.signin) {
            setEntry(data.s);
          } else {
            mainfunc({ s: data.s, u: data.u, p: data.p });
          }
        }}
      />
    );
  } else if (entry === EntryState.signin) {
    content = (
      <Signin
        signinfunc={(data) => {
          if (data.s === EntryState.login || data.s === EntryState.signin) {
            setEntry(data.s);
          } else {
            mainfunc({ s: data.s, u: data.u, p: data.p });
          }
        }}
      />
    );
  }

  return <View>{content}</View>;
};

const Login = ({ loginfunc }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function loginbtnfunc() {
    AsyncStorage.getItem(username)
      .then((d) => {
        const alldata = JSON.parse(d);
        if (alldata.pw !== password) {
          console.warn('Invalid Username or Password!!');
        } else {
          loginfunc({ s: ScreenState.home, u: username, p: password });
        }
      })
      .catch((err) => {
        console.warn('Username not registerd!!');
      });
  }

  return (
    <View>
      <View style={styles.Container}>
        <Text style={styles.Label}>Login Screen</Text>
        <View>
          <TextInput
            style={styles.Input}
            placeholder="Enter Your Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.Input}
            secureTextEntry={true}
            placeholder="Enter Your Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
      </View>
      <View style={styles.Subcontainer}>
        <Button
          title="Login"
          onPress={() => {
            if (username !== '' && password !== '') {
              loginbtnfunc();
            } else {
              console.warn('Please Enter Your Username and Password');
            }
          }}
        />
        <Button
          title="Signin?"
          onPress={() => {
            loginfunc({ s: EntryState.signin, u: '', p: '' });
          }}
        />
      </View>
    </View>
  );
};

const Signin = ({ signinfunc }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function backAction() {
        signinfunc({ s: EntryState.login, u: '', p: '' });
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  function signinbtnfunc() {
    if (username === '') {
      console.warn('Username is Empty');
    } else if (password === '') {
      console.warn('Password is Empty');
    } else if (password.length < 5) {
      console.warn('Password length is less than 5');
    } else {
      AsyncStorage.getItem(username).then((d) => {
        if (d === null) {
          signinfunc({ s: ScreenState.home, u: username, p: password });
        } else {
          console.warn('Username Already in use!!');
        }
      });
    }
  }
  return (
    <View>
      <View style={styles.Container}>
        <Text style={styles.Label}>Signin Screen</Text>
        <View>
          <TextInput
            style={styles.Input}
            placeholder="Enter Your Desired Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.Input}
            secureTextEntry={true}
            placeholder="Enter Password of Length more than 5"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
      </View>
      <View style={styles.Subcontainer}>
        <Button
          title="Signin"
          onPress={() => {
            signinbtnfunc();
          }}
        />
      </View>
    </View>
  );
};

export default LoginSigninScreen;

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
