import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import { DecodeResult } from './interfaces'

type Props = {
  data: DecodeResult
}

const audioContext = new AudioContext()

const SoundPlayer: FC<Props> = ({ data }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const startTimeRef = useRef(0)
  const nextStartTimeRef = useRef(0)
  const audioNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const audioBuffer = useMemo(() => {
    const audioBuffer = audioContext.createBuffer(
      data.channelCount,
      data.channelData.length,
      data.sampleRate,
    )
    for (let i = 0; i < data.channelCount; i++) {
      audioBuffer.copyToChannel(data.channelData, i)
    }
    return audioBuffer
  }, [data])
  const onPlayEnded = useCallback(() => {
    setIsPlaying(false)
    audioNodeRef.current = null
    nextStartTimeRef.current += audioContext.currentTime - startTimeRef.current
  }, [])
  const onTogglePlaying = useCallback(() => {
    if (isPlaying) {
      audioNodeRef.current?.stop()
      setIsPlaying(false)
    } else {
      const audioNode = audioContext.createBufferSource()
      audioNode.buffer = audioBuffer
      audioNode.connect(audioContext.destination)
      audioNode.onended = onPlayEnded
      audioNode.start(
        0,
        nextStartTimeRef.current > audioBuffer.duration
          ? 0
          : nextStartTimeRef.current,
      )
      startTimeRef.current = audioContext.currentTime
      audioNodeRef.current = audioNode
      setIsPlaying(true)
    }
  }, [audioBuffer, isPlaying, onPlayEnded])
  const onClickStop = useCallback(() => {
    setIsPlaying(false)
    audioNodeRef.current?.stop()
    nextStartTimeRef.current = audioBuffer.duration
  }, [])
  return (
    <div>
      <button title={isPlaying ? '暂停' : '播放'} onClick={onTogglePlaying}>
        {isPlaying ? <div className="pause" /> : <div className="play" />}
      </button>
      <button title="停止" onClick={onClickStop}>
        <div className="stop" />
      </button>
    </div>
  )
}
export default SoundPlayer
