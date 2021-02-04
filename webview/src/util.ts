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
            for (const [channelNumber, channelData] of data.channels.entries()) {
                cache.copyToChannel(Float32Array.from(channelData), channelNumber)
            }
            return cache
        }
    }
    return GetAudioBuffer(data)
}