import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { Push } from './FlatList'
const TodoContext = React.createContext([])

const styles = StyleSheet.create({
    todoContainer: {
        flex: 1,
        width: '90%',
        paddingBottom: 10
    },
    todoInput: {
        fontSize: 24,
        padding: 5,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#270722",
        color: "#000000"
    }
})


export const TodoButton = function(props){
    const state = React.useContext(TodoContext)
    
    return <Button
        onPress={state.addTodo}
        title="Add Item"
        color="#841584"
        accessibilityLabel="Add item to todo list"
    />
}

export const TodoInput = function(props){
    const state = React.useContext(TodoContext)
    
    return <TextInput 
        style={styles.todoInput}
        value={state.input} 
        onChangeText={state.inputChange} 
        placeholder="Todo item..." 
    />
}

const Todo = function(props){
    const [todos, toggleTodos] = React.useState([])
    const [input, setInput] = React.useState("") 

    const addTodo = React.useCallback(function(){
        toggleTodos([input, ...todos])
        setInput("")
    }, [input])

    const inputChange = React.useCallback(text => {
        setInput(text)
    },[])

    const state = { todos, input, addTodo, inputChange }
    return <TodoContext.Provider value={state}>
        <View style={styles.todoContainer}>
            { props.children }
            <Push data={todos}/>
        </View>
    </TodoContext.Provider>
}
export default Todo