declare interface VSCode<T = unknown> {
    getState(): T | void
    setState(state: T): void
}
declare function acquireVsCodeApi(): VSCode;

declare module '*.css';
declare module '*.mp3' {
    const context: string
    export default context
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