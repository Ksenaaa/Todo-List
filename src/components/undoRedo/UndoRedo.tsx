import React, { FC, useCallback } from 'react'

import { undoHistory, redoHistory } from './../../store/todoSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Button } from '../button/Button'

import './_style.scss'

type Props = {
}

export const UndoRedo: FC<Props> = () => {
    const { past, future } = useAppSelector(state => state.todos)

    const dispatch = useAppDispatch()

    const onClickUndo = useCallback(() => {
        dispatch(undoHistory())
    }, [dispatch])

    const onClickRedo = useCallback(() => {
        dispatch(redoHistory())
    }, [dispatch])

    const canUndo = past.length > 0
    const canRedo = future.length > 0

    return (
        <div className="wrapperUndoRedo">
            <Button 
                nameButton='undo' 
                clickButton={onClickUndo}
                disabled={!canUndo}
            />
            <Button 
                nameButton='redo' 
                clickButton={onClickRedo}
                disabled={!canRedo}
            />
        </div>
    )
}
