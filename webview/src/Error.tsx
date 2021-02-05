import React, { ReactElement } from 'react'

type Props = {
    message: string
}

export default function Error({
    message,
}: Readonly<Props>): ReactElement {
    return <span>{`音频解析错误:${message}`}</span>
}