declare module 'web-audio-api' {
    export const AudioContext: {
        prototype: AudioContext;
        new(contextOptions?: AudioContextOptions): AudioContext;
    }
}

declare type AudioData = {
    type: 'audioData'
    numberOfChannels: number,
    length: number,
    sampleRate: number,
    channels: number[],
}

declare type ErrorMessage = {
    type: 'error',
    message: string,
}