import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoItem from './item';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async newTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: task, completed: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTask('');
    }
  };

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const editTask = (id, newText) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder="Enter a task"
      />
      <Button title="Add Task" onPress={addTask} />
      <ScrollView style={styles.scrollView}>
        {tasks.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTask}
            onEdit={editTask} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    marginTop: 20,
  },
});
