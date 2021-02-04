declare module 'web-audio-api' {
    export const AudioContext: {
        prototype: AudioContext;
        new(contextOptions?: AudioContextOptions): AudioContext;
    }
}

declare type AudioData = {
    numberOfChannels: number,
    length: number,
    sampleRate: number,
    channels: number[][],
}