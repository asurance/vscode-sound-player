import { AudioDecoder } from 'audio-file-decoder'
import React, { PureComponent, ReactElement } from 'react'

type Props = {
  audioDecoder: AudioDecoder
}

type State = {
  audioNode: AudioBufferSourceNode | null
}

const audioContext = new AudioContext()

export default class SoundPlayer extends PureComponent<Props, State> {
  private audioBuffer: AudioBuffer

  constructor(props: Readonly<Props>) {
    super(props)
    this.state = {
      audioNode: null,
    }
    const { audioDecoder } = props
    const audioData = audioDecoder.decodeAudioData()
    this.audioBuffer = audioContext.createBuffer(
      audioDecoder.channelCount,
      audioData.length,
      audioDecoder.sampleRate,
    )
    for (let i = 0; i < audioDecoder.channelCount; i++) {
      this.audioBuffer.copyToChannel(audioData, i)
    }
  }

  private onClickStop = () => {
    const { audioNode } = this.state
    if (audioNode) {
      audioNode.stop()
    }
    this.onPlayEnded()
  }

  private onClickStart = () => {
    const audioNode = audioContext.createBufferSource()
    audioNode.buffer = this.audioBuffer
    audioNode.addEventListener('ended', this.onPlayEnded)
    audioNode.connect(audioContext.destination)
    audioNode.start()
    this.setState({ audioNode })
  }

  private onPlayEnded = () => {
    this.setState({ audioNode: null })
  }

  render(): ReactElement {
    const { audioNode } = this.state
    if (audioNode) {
      return <button onClick={this.onClickStop}>停止</button>
    } else {
      return <button onClick={this.onClickStart}>播放</button>
    }
  }
}
