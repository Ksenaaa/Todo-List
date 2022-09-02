import React, { Dispatch, FC, SetStateAction, useCallback } from 'react'

import { onSetTodo } from './../../store/todoSlice'
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

    const addTask = useCallback(() => {
        dispatch(onSetTodo(text))
        setText('')
    }, [dispatch, text, setText])
    
    return (
        <div className="wrapperInputButton">
            <Input
                value={text} 
                setText={setText}
            />
            <Button
                nameButton='Add todo' 
                onClick={addTask}
            />
        </div>
    )
}
