import React, { FC } from 'react'

import './_style.scss'

type Props = {
    nameButton: string,
    onClick: () => void,
}

export const Button: FC<Props> = ({ nameButton, onClick }) => (
    <div className="wrapperButton" onClick={onClick}>
        {nameButton}
    </div>
)
