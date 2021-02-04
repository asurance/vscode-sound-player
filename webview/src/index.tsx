import React from 'react'
import { render } from 'react-dom'
import App from './App'
import SoundPlayer from './SoundPlayer'

window.addEventListener('message', (ev) => {
    if (ev.data.type === 'audioData') {
        render(<SoundPlayer audioData={ev.data} />, document.getElementById('main'))
    }
})

render(<App />, document.getElementById('main'))