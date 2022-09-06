import React, { FC, useCallback } from 'react'

import { deleteTodo } from './../../store/todoSlice'
import { ITodo } from '../../interface/ITodo'
import { Checkbox } from '../checkbox/Checkbox'
import { useAppDispatch } from '../../hooks/hooks'

import './_style.scss'

type Props = {
    todo: ITodo,
}

export const TodoItem: FC<Props> = ({ todo }) => {
    const dispatch = useAppDispatch()

    const onDelete = useCallback(() => 
        dispatch(deleteTodo(todo.id))
    , [dispatch, todo.id]) 
    
    return (
        <li>
            <div className="itemList">
                <Checkbox todo={todo} />
                <span>{todo.title}</span>
                <span className="deleteItem" onClick={onDelete}>X</span>
            </div>
        </li>
    )
}
