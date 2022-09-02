import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from 'react'

import './_style.scss'

type Props = {
    value: string,
    setText: Dispatch<SetStateAction<string>>,
}

export const Input: FC<Props> = ({ value, setText }) => {
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => 
        setText(e.target.value)
    , [setText])

    return (
        <>
            <label htmlFor="">
                <input type="text" onChange={onChange} value={value} />
            </label>
        </>
    )
}
