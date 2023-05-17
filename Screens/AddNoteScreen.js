import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenState } from '../utils/state';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNoteScreen = (props) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    async function fetchNote() {
      try {
        const tempdata = await AsyncStorage.getItem(props.user);
        let temp = JSON.parse(tempdata).nt;
        const tempnote = temp.filter((n) => {
          if (n['id'] === props.id) {
            setNote(n['note']);
            return false;
          }
          return true;
        });
        const data = { pw: props.pw, nt: tempnote };
        await AsyncStorage.setItem(props.user, JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    }

    if (props.user === '') {
      props.func({ s: ScreenState.loginsignin });
    }

    if (props.id !== 0) {
      fetchNote();
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function backAction() {
        props.func({ s: ScreenState.home });
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.Parentcontainer}>
      <Text style={styles.Label}>Add Note Screen</Text>
      <View>
        <TextInput
          editable={true}
          multiline={true}
          numberOfLines={3}
          style={styles.Input}
          placeholder="Add Your Note Here."
          value={note}
          onChangeText={(text) => {
            setNote(text);
          }}
        />
        <View style={styles.Subcontainer}>
          <Button
            title="Add"
            onPress={() => {
              if (note !== '') {
                AsyncStorage.getItem(props.user)
                  .then((d) => {
                    let tempdata = [];
                    JSON.parse(d).nt.map((n) => {
                      tempdata.push(n);
                    });
                    tempdata.push({ id: Date.now(), note: note });
                    let alldata = { pw: JSON.parse(d).pw, nt: tempdata };
                    AsyncStorage.setItem(props.user, JSON.stringify(alldata));
                  })
                  .catch((err) => {
                    console.warn('Error! Please retry.');
                  });
                props.func({ s: ScreenState.home });
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default AddNoteScreen;

const styles = StyleSheet.create({
  Parentcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Label: {
    color: '#b9e4c9',
    marginTop: 50,
    fontSize: 40,
  },
  Input: {
    marginTop: 20,
    width: 260,
    height: 200,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#b9e4c9',
  },
  Subcontainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-evenly',
  },
});
