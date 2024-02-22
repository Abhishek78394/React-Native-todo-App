import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ToDoItem = ({ todo, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleSaveEdit = () => {
        onEdit(todo.id, editedText);
        setIsEditing(false);
    };

    return (
        <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.container}>
            <View style={styles.todo}>
                {isEditing ? (
                    <TextInput
                        value={editedText}
                        onChangeText={text => setEditedText(text)}
                        onBlur={handleSaveEdit}
                        autoFocus
                        style={styles.input}
                    />
                ) : (
                    <Text style={[styles.text, todo.completed && styles.completed]}>{todo.text}</Text>
                )}
                {isEditing ? (
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => onEdit(todo.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
<View style={styles.buttons}>
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                 
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 10,
        marginTop: 4,
        color: 'blue',
    },
    deleteButton: {
        backgroundColor: '#ff3333',
        borderRadius: 5,
        padding: 5,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ToDoItem;
