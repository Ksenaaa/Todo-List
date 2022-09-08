import React, { useState } from 'react';

import { TodoList } from './components/todoList/TodoList';
import { InputField } from './components/inputField/InputField';
import { useAppSelector } from './hooks/hooks';
import { UndoRedo } from './components/undoRedo/UndoRedo';

import './App.scss';

export const App = () => {
  const [text, setText] = useState('')

  const { loading, error } = useAppSelector(state => state.todos)

  return (
    <div className="wrapper">
      <h1>todo list</h1>
      <UndoRedo />
      <InputField text={text} setText={setText} />
      {loading && <h2>...Loading...</h2>}
      {error && <h2>Error occured: {error}</h2>}
      <TodoList />
    </div>
  )
}
