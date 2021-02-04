declare interface VSCode<T = unknown> {
    getState(): T | void
    setState(state: T): void
}
declare function acquireVsCodeApi(): VSCode;

declare module '*.css';