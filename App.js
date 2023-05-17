import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';
import { useEffect, useState } from 'react';
import { ScreenState } from './utils/state';
import AddNoteScreen from './Screens/AddNoteScreen';
import ViewAllNoteScreen from './Screens/ViewAllNoteScreen';
import LoginSigninScreen from './Screens/LoginSigninScreen';
import { EntryState } from './utils/entry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './Screens/ProfileScreen';

export default function App() {
  const [screen, setScreen] = useState(ScreenState.loginsignin);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [headerpicker, setHeaderPicker] = useState(EntryState.nopicker);
  const [id, setId] = useState(0);

  let head;
  let content;

  deleteall = async () => {
    try {
      const tempdata = { pw: password, nt: [] };
      await AsyncStorage.setItem(username, JSON.stringify(tempdata));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (username === '') {
      setScreen(ScreenState.loginsignin);
    }
    if (id !== 0) {
      setScreen(ScreenState.addnote);
    }
  }, [username, id]);

  if (headerpicker === 'no' || headerpicker === 'yes') {
    head = (
      <Header
        headerpicker={headerpicker}
        func={(data) => {
          setScreen(data.s);
        }}
      />
    );
  }

  if (screen === ScreenState.home) {
    content = (
      <HomeScreen
        func={(data) => {
          setScreen(data.s);
        }}
      />
    );
  } else if (screen === ScreenState.addnote) {
    content = (
      <AddNoteScreen
        user={username}
        pw={password}
        id={id}
        func={(data) => {
          setId(0);
          setScreen(data.s);
        }}
      />
    );
  } else if (screen === ScreenState.viewallnote) {
    content = (
      <ViewAllNoteScreen
        user={username}
        func={(data) => {
          if (data.id != 0) {
            setId(data.id);
          } else {
            setScreen(data.s);
          }
        }}
      />
    );
  } else if (screen === ScreenState.loginsignin) {
    content = (
      <LoginSigninScreen
        func={(data) => {
          setUsername(data.u);
          setScreen(data.s);
          setPassword(data.p);
          setHeaderPicker('yes');
        }}
      />
    );
  } else if (screen === ScreenState.clearall) {
    deleteall();
    setScreen(ScreenState.home);
  } else if (screen === ScreenState.logout) {
    setUsername('');
    setHeaderPicker(EntryState.nopicker);
    setPassword('');
    setScreen(ScreenState.loginsignin);
  } else if (screen == ScreenState.profile) {
    content = (
      <ProfileScreen
        user={username}
        pw={password}
        func={(data) => {
          setPassword(data.p);
          setUsername(data.u);
          setScreen(data.s);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {head}
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#356859',
  },
});
