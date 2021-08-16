import test from '../assets/test.mp3'
import './debug.css'

const empty = () => {
  /** */
}

async function main() {
  const response = await fetch(test)
  const buffer = await response.arrayBuffer()
  const context = new AudioContext()
  const audioBuffer = await context.decodeAudioData(buffer)
  console.log(audioBuffer)
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    console.log(audioBuffer.getChannelData(i).length)
  }
  await import('./index')
}

window.acquireVsCodeApi = () => {
  return {
    getState: empty,
    setState: empty,
  }
}

const meta = document.getElementById('source')!
meta.setAttribute('src', test)

main()
