import React, { FC, useCallback } from 'react'

import { toggleStatus } from './../../store/todoSlice'
import { ITodo } from '../../interface/ITodo'
import { useAppDispatch } from '../../hooks/hooks'

import './_style.scss'

type Props = {
    todo: ITodo,
}

export const Checkbox: FC<Props> = ({ todo }) => {
    const dispatch = useAppDispatch()

    const onCheck = useCallback(() => 
        dispatch(toggleStatus(todo.id))
    , [dispatch, todo.id]) 

    return (
        <input className="checkbox" type="checkbox" checked={todo.completed} onChange={onCheck} />
    )
}
