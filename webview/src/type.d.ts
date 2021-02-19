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

declare module '*.wasm' {
    const context: string
    export default context
}