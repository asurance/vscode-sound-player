export const vscode = acquireVsCodeApi()

export let GetAudioContext = (): AudioContext => {
    const context = new AudioContext()
    GetAudioContext = () => context
    return GetAudioContext()
}

export let GetAudioBuffer = (data: AudioData): AudioBuffer => {
    let pre: AudioData | null = null
    const context = GetAudioContext()
    let cache: AudioBuffer | null = null
    GetAudioBuffer = (data: AudioData) => {
        if (data === pre) {
            return cache!
        } else {
            pre = data
            cache = context.createBuffer(data.numberOfChannels, data.length, data.sampleRate)
            for (let i = 0; i < data.numberOfChannels; i++) {
                cache.copyToChannel(Float32Array.from(data.channels.slice(data.length * i, data.length * (i + 1))), i)
            }
            return cache
        }
    }
    return GetAudioBuffer(data)
}