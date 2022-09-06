import React, { FC } from 'react'

import { TodoItem } from './TodoItem'
import { useAppSelector } from '../../hooks/hooks'

import './_style.scss'

export const TodoList: FC = () => {
    const todos = useAppSelector(state => state.todos.todos)

    return (
        <div className="wrapperTodoList">
            <ol className="wrapperList">
                {todos.map(todo => 
                    <TodoItem key={todo.id} todo={todo} />
                )}
            </ol>
        </div>
    )
}
