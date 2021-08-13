import React from 'react'
import { render } from 'react-dom'
import Error from './Error'
import Loading from './Loading'
import SoundPlayer from './SoundPlayer'
import { getAudioDecoder } from 'audio-file-decoder'
import './index.css'
import DecodeAudioWasm from 'audio-file-decoder/decode-audio.wasm'

async function Main() {
  const root = document.getElementById('main')!
  render(<Loading />, root)
  try {
    const meta = document.getElementById('source')!
    const src = meta.getAttribute('src')!
    const response = await fetch(src)
    const buffer = await response.arrayBuffer()
    const file = new File([buffer], 'audio')
    const audioDecoder = await getAudioDecoder(DecodeAudioWasm, file)
    render(<SoundPlayer audioDecoder={audioDecoder} />, root)
  } catch (e) {
    let message = 'unknown error'
    if (typeof e === 'string') {
      message = e
    } else if (typeof e.message === 'string') {
      message = e.message
    }
    render(<Error message={message} />, root)
  }
}
Main()
