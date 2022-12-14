import React, { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'

import { fetchTodos, addTodo } from './../../store/todoSlice'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { useAppDispatch } from '../../hooks/hooks';

import './_style.scss'

type Props = {
    text: string, 
    setText: Dispatch<SetStateAction<string>>,
}

export const InputField: FC<Props> = ({ text, setText }) => {
    const dispatch = useAppDispatch()
    
    const canAdd = text.trim().length > 0
    
    const addTask = useCallback(() => {
        if (canAdd) {
            dispatch(addTodo(text))
            setText('')
        }
    }, [dispatch, text, setText, canAdd])
    
    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div className="wrapperInputButton">
            <Input
                value={text} 
                setText={setText}
            />
            <Button
                nameButton='Add todo' 
                clickButton={addTask}
                disabled={!canAdd}
            />
        </div>
    )
}
