import React, { FC, useCallback, useRef, useState } from 'react'
import Slider from './components/Slider'
import { SoundObject } from './SoundObject'

type Props = {
  source: SoundObject
}

const SoundPlayer: FC<Props> = ({ source }: Props) => {
  const intervalId = useRef<number | null>(null)

  const stopSync = useCallback(() => {
    console.log('stop')
    if (intervalId.current !== null) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }, [])
  const startSync = useCallback(() => {
    console.log('start')
    stopSync()
    intervalId.current = window.setInterval(() => {
      console.log('sync')
      setSoundPosition(source.position / source.length)
    }, 30)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [isPlaying, setIsPlaying] = useState(false)
  const onTogglePlaying = useCallback(() => {
    if (isPlaying) {
      source.pause()
      stopSync()
      setIsPlaying(false)
    } else {
      source.play()
      startSync()
      setIsPlaying(true)
    }
  }, [isPlaying, source, startSync, stopSync])
  const onClickStop = useCallback(() => {
    source.stop()
    stopSync()
    setIsPlaying(false)
  }, [source, stopSync])

  const [soundPosition, setSoundPosition] = useState(0)
  const onSoundPositionChange = useCallback((value: number) => {
    setSoundPosition(value)
  }, [])
  return (
    <div>
      <button title={isPlaying ? '暂停' : '播放'} onClick={onTogglePlaying}>
        {isPlaying ? <div className="pause" /> : <div className="play" />}
      </button>
      <button title="停止" onClick={onClickStop}>
        <div className="stop" />
      </button>
      <Slider value={soundPosition} onValueChange={onSoundPositionChange} />
    </div>
  )
}
export default SoundPlayer
