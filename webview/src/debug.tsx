import test from '../assets/test.mp3'

const empty = () => { /** */ }

async function main() {
    const response = await fetch(test)
    const buffer = await response.arrayBuffer()
    const context = new AudioContext()
    const audioBuffer = await context.decodeAudioData(buffer)
    console.log(audioBuffer)
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