import React, { FC, useMemo } from 'react'
import { audioContext } from '.'
import useDecoder from './hooks/useDecoder'
import SoundPlayer from './SoundPlayer'
type Props = Record<string, never>

const App: FC<Props> = () => {
  const { loading, error, decodeResult } = useDecoder()
  const audioBuffer = useMemo(() => {
    if (decodeResult) {
      const audioBuffer = audioContext.createBuffer(
        decodeResult.channelCount,
        decodeResult.channelData.length,
        decodeResult.sampleRate,
      )
      for (let i = 0; i < decodeResult.channelCount; i++) {
        audioBuffer.copyToChannel(decodeResult.channelData, i)
      }
      return audioBuffer
    } else {
      return null
    }
  }, [decodeResult])
  if (loading) {
    return <div className="loader" />
  } else {
    if (audioBuffer) {
      return <SoundPlayer audioBuffer={audioBuffer} />
    } else {
      return (
        <>
          <div className="warn" />
          {error}
        </>
      )
    }
  }
}

export default App
