import React, { FC } from 'react'

import { RootState } from '../../store'
import { TodoItem } from './TodoItem'
import { useAppSelector } from '../../hooks/hooks'

import './_style.scss'

export const TodoList: FC = () => {
    const todos = useAppSelector((state: RootState) => state.todos.todos)

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
