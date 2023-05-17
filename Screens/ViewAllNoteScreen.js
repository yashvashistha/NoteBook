import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenState } from '../utils/state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/base';

const { width, height } = Dimensions.get('window');

const ViewAllNoteScreen = (props) => {
  const [notes, setNotes] = useState([]);
  const [pw, setPw] = useState();

  deleteNote = async (id) => {
    try {
      const tempnotes = notes.filter((note) => note['id'] !== id);
      let alldata = { pw: pw, nt: tempnotes };
      await AsyncStorage.setItem(props.user, JSON.stringify(alldata));
      setNotes(tempnotes);
    } catch (error) {
      console.log('Error');
    }
  };

  useEffect(() => {
    async function fetchName() {
      try {
        const storedNotes = await AsyncStorage.getItem(props.user);
        let temp = JSON.parse(storedNotes).nt;
        setPw(JSON.parse(storedNotes).pw);
        setNotes(temp);
      } catch (error) {
        console.log(error);
      }
    }
    fetchName();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function backAction() {
        props.func({ s: ScreenState.home, id: 0 });
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>All Notes Screen</Text>
      <View style={{ height: height - 180 }}>
        <ScrollView
          horizontal={false}
          pagingEnabled={false}
          decelerationRate={0}
          snapToAlignment={'center'}
        >
          {notes.map((note) => (
            <View style={styles.Subcontainer} key={note['id']}>
              <View style={styles.Btncontainer}>
                <Button
                  title="Edit"
                  onPress={() => {
                    props.func({ s: ScreenState.addnote, id: note['id'] });
                  }}
                />
                <Button
                  title="delete"
                  onPress={() => {
                    deleteNote(note['id']);
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#b9e4c9' }}>{note['note']}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewAllNoteScreen;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
  },
  Label: {
    fontSize: height - 870,
    color: '#b9e4c9',
    marginTop: height - 880,
  },
  Subcontainer: {
    flex: 1,
    marginTop: height - 860,
    backgroundColor: '#34A559',
    // backgroundColor: '#b9e4c9',
    width: width - 100,
    margin: height - 890,
    height: height - 350,
    borderRadius: height - 880,
    justifyContent: 'center',
    paddingHorizontal: height - 880,
  },
  Btncontainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-evenly',
  },
});
