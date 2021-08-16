import { useEffect, useState } from 'react'
import { ParseError } from '../Utils'
import { getAudioDecoderWorker } from 'audio-file-decoder'
import wasm from 'audio-file-decoder/decode-audio.wasm'
import { DecodeResult } from '../interfaces'

type ReturnValue = {
  loading: boolean
  error: string
  decodeResult: DecodeResult | null
}

export default function useDecoder(): ReturnValue {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [decodeResult, setDecodeResult] = useState<DecodeResult | null>(null)
  useEffect(() => {
    try {
      const metaElement = document.getElementById('source')!
      const metaSrc = metaElement.getAttribute('src')!
      ;(async () => {
        const response = await fetch(metaSrc)
        const buffer = await response.arrayBuffer()
        const audioDecoder = await getAudioDecoderWorker(wasm, buffer)
        const decodeResult = await audioDecoder.decodeAudioData(
          0,
          audioDecoder.duration,
        )
        setLoading(false)
        setDecodeResult({
          channelCount: audioDecoder.channelCount,
          sampleRate: audioDecoder.sampleRate,
          channelData: decodeResult,
        })
        audioDecoder.dispose()
      })().catch((err) => {
        setLoading(false)
        setError(ParseError(err))
      })
    } catch (err) {
      setLoading(false)
      setError(ParseError(err))
    }
  }, [])
  return {
    loading,
    error,
    decodeResult,
  }
}
