import test from '../assets/test.mp3'

const empty = () => { /** */ }

function Wait(time: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, time))
}

async function DecodeAudio(url: string) {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const ctx = new OfflineAudioContext(2, 48000, 48000)
    const audioBuffer = await ctx.decodeAudioData(buffer)
    return audioBuffer
}

async function main() {
    await import('./index')
    const [audioBuffer] = await Promise.all([DecodeAudio(test), Wait(5000)])
    const needError = true
    if (needError) {
        const error: ErrorMessage = {
            type: 'error',
            message: 'mock error'
        }
        postMessage(error, '*')
    } else {
        const channelData: number[] = []
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            const buffer = audioBuffer.getChannelData(i)
            channelData.push(...buffer)
        }
        const data: AudioData = {
            type: 'audioData',
            numberOfChannels: audioBuffer.numberOfChannels,
            length: audioBuffer.length,
            sampleRate: audioBuffer.sampleRate,
            channels: []
        }
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            const buffer = audioBuffer.getChannelData(i)
            data.channels.push(...buffer)
        }
        postMessage({ ...data, type: 'audioData' }, '*')
    }
}

window.acquireVsCodeApi = () => {
    return {
        getState: empty,
        setState: empty,
    }
}

main()