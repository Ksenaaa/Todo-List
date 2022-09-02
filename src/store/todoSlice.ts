import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITodo } from '../interface/ITodo';

type TodosState = {
    todos: ITodo[]
}

const initialState: TodosState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        onSetTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,        
            })
        },
        togleTodoComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload)
            toggledTodo && (toggledTodo.completed = !toggledTodo.completed)
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
    },
})

export const { onSetTodo, togleTodoComplete, removeTodo } = todoSlice.actions

export default todoSlice.reducer
