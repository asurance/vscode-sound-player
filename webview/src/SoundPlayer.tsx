import React, { FC, useCallback, useState } from 'react'
import { SoundObject } from './SoundObject'

type Props = {
  source: SoundObject
}

const SoundPlayer: FC<Props> = ({ source }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const onTogglePlaying = useCallback(() => {
    if (isPlaying) {
      source.pause()
      setIsPlaying(false)
    } else {
      source.play()
      setIsPlaying(true)
    }
  }, [isPlaying, source])
  const onClickStop = useCallback(() => {
    source.stop()
    setIsPlaying(false)
  }, [source])
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
