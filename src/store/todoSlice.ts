import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';

import { ITodo } from '../interface/ITodo';

type TodosState = {
    todos: ITodo[],
    loading: boolean,
    error: null | string,
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
}

export const fetchTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
    'todos/fetchTodos',
    async function(_, { rejectWithValue }) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')

        if (!response.ok) {
            return rejectWithValue('Server Error!')
        }

        const data = await response.json()
        return data
    }
)
    
export const addTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todos/addTodo',
    async function(text, { rejectWithValue }) {
        const todo = {
            userId: new Date().toISOString(),
            title: text,
            completed: false,        
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
        
        if (!response.ok) {
            return rejectWithValue('Сannot add todo! Server Error!')
        }
        
        const data = await response.json() as ITodo
        return data
    }
)

export const toggleStatus = createAsyncThunk<ITodo, string, { rejectValue: string, state: { todos: TodosState } }>(
    'todos/toggleStatus',
    async function(id, { rejectWithValue, getState }) {
        const state = getState()
        const todo = state.todos.todos.find(todo => todo.id === id)

        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !todo.completed })
            })
    
            if (!response.ok) {
                return rejectWithValue('Сannot be toggle status! Server Error!')
            }

            const data = await response.json() as ITodo
            return data
        }

        return rejectWithValue('Сannot find toggle!')
    }
)

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function(id, { rejectWithValue }) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })

        if (!response.ok) {
            return rejectWithValue('Сannot be deleted! Server Error!')
        }
    
        return id
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.error = null      
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload            
            })
            .addCase(addTodo.pending, (state) => {
                state.error = null      
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
                toggledTodo && (toggledTodo.completed = !toggledTodo.completed)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false
                state.error = action.payload      
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export default todoSlice.reducer
