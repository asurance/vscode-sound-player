import React from 'react'
import { render } from 'react-dom'
import Error from './Error'
import Loading from './Loading'
import SoundPlayer from './SoundPlayer'

const root = document.getElementById('main')!

render(< Loading />, root)

window.addEventListener('message', (ev: MessageEvent<AudioData | ErrorMessage>) => {
    switch (ev.data.type) {
        case 'audioData':
            render(<SoundPlayer audioData={ev.data} />, root)
            break
        case 'error':
            render(<Error message={ev.data.message} />, root)
            break

    }
})