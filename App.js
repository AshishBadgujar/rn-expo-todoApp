import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Header from './components/header';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setData();
  }, [])

  const setData = async () => {
    try {
      let array = await AsyncStorage.getItem("myList")
      array = JSON.parse(array)
      if (array != null) {
        setTodos(array)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const storeData = async () => {
    if (text.length > 0) {
      try {
        todos.push(text)
        await AsyncStorage.setItem("myList", JSON.stringify(todos))
        setText('')
      } catch (error) {
        console.log(error)
      }
    } else {
      Alert.alert('OPPS!', 'Please enter todo', [{ text: 'OK', onPress: () => console.log('error') }])
    }
  }
  const deleteTodo = async (key) => {
    let newArray = todos.filter(todo => todos.indexOf(todo) != key)
    setTodos(newArray)
    try {
      if (newArray.length == 0) {
        await AsyncStorage.removeItem("myList")
      } else {
        await AsyncStorage.setItem("myList", JSON.stringify(newArray))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.innercontainer} >
          <View>
            <TextInput
              style={styles.input}
              placeholder='Enter new todo...'
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <View style={styles.button}>
              <MaterialIcons
                name='add'
                size={25}
                color="#ffce57"
                onPress={() => storeData()} />
            </View>
          </View>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <View style={styles.oneTodo}>
                <Text style={styles.oneTodoText}>{item}</Text>
                <MaterialIcons name='delete'
                  size={18}
                  color='#333'
                  onPress={() => deleteTodo(todos.indexOf(item))} />
              </View>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  innercontainer: {
    marginHorizontal: 10,
    overflow: "scroll"
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10,
    paddingVertical: 6
  },
  button: {
    width: "25%",
    marginHorizontal: "35%",
    padding: 8,
    elevation: 4,
    marginVertical: 10,
    backgroundColor: "#333",
    alignItems: "center",
    borderRadius: 5
  },
  oneTodo: {
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#333",
    padding: 12,
    marginVertical: 8,
    borderRadius: 5
  },
  oneTodoText: {
    marginLeft: 10,
  },
});










