import React, { ReactElement, useState } from 'react'

export default function SoundPlayer(): ReactElement {
    const [isLoading] = useState(true)
    if (isLoading) {
        return <span>加载中</span>
    } else {
        return <button>播放</button>
    }
}