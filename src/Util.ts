import { readFile } from 'fs'
import { resolve } from 'path'
import { Uri, workspace } from 'vscode'
import { AudioContext } from 'web-audio-api'

export async function GetWebviewContent(rootPath: string): Promise<string> {
    const htmlPath = resolve(rootPath, 'index.html')
    const htmlContent = await new Promise<string>((resolve, reject) => readFile(htmlPath, 'utf-8', (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    }))
    return htmlContent.replace(/(<script.+?src="|<link.+?href=")(.+?)"/g, (match, $1, $2) => {
        return `${$1}${Uri.file(resolve(rootPath, $2)).with({ scheme: 'vscode-resource' })}"`
    })
}

export async function LoadArrayBuffer(uri: Uri): Promise<ArrayBuffer> {
    const content = await workspace.fs.readFile(uri)
    return content.buffer
}

const context = new AudioContext()

export async function DecodeAudio(buffer: ArrayBuffer): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => context.decodeAudioData(buffer, resolve, reject))
}

export function LogError(err: unknown): string {
    if (typeof err === 'string') {
        return err
    } else if (typeof (err as { message: string }).message === 'string') {
        return (err as { message: string }).message
    } else {
        return 'unknown error'
    }
}