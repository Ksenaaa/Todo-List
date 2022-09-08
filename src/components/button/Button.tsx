import React, { FC } from 'react'

import './_style.scss'

type Props = {
    nameButton: string,
    clickButton: () => void,
    disabled?: boolean,
}

export const Button: FC<Props> = ({ nameButton, clickButton, disabled }) => (
    <div className={disabled ? "wrapperButton is-disabled" :"wrapperButton"} onClick={clickButton}>
        {nameButton}
    </div>
)
