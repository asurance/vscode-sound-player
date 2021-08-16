import { AudioDecoder, getAudioDecoder } from 'audio-file-decoder'
import wasm from 'audio-file-decoder/decode-audio.wasm'

export async function LoadDecoder(): Promise<AudioDecoder> {
  const metaElement = document.getElementById('source')!
  const metaSrc = metaElement.getAttribute('src')!
  const response = await fetch(metaSrc)
  const buffer = await response.arrayBuffer()
  const audioDecoder = await getAudioDecoder(wasm, buffer)
  return audioDecoder
}

export function ParseError(error: unknown): string {
  if (typeof error === 'string') {
    return error
  } else if (error instanceof Error) {
    return error.message
  }
  return 'unknown error'
}
