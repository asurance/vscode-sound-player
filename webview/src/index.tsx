import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'

export const audioContext = new AudioContext()

render(<App />, document.getElementById('main'))
