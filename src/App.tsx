import React, { useState } from 'react';

import { TodoList } from './components/todoList/TodoList';
import { InputField } from './components/inputField/InputField';

import './App.scss';

export const App = () => {
  const [text, setText] = useState('')

  return (
    <div className="wrapper">
      <h1>todo list</h1>
      <InputField text={text} setText={setText} />
      <TodoList />
    </div>
  )
}
