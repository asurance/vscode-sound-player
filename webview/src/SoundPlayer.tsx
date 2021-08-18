import React, { Component, ReactNode } from 'react'
import { audioContext } from '.'
import Slider from './components/Slider'

type Props = {
  audioBuffer: AudioBuffer
}

type State = {
  isPlaying: boolean
  position: number
}

class SoundPlayer extends Component<Props, State> {
  private audioNode: AudioBufferSourceNode | null = null
  private intervalId: number | null = null
  private startMS = 0
  private startPosition = 0
  private wasPlay = false
  private isPause = false

  state = {
    isPlaying: false,
    position: 0,
  }

  private onTogglePlaying = () => {
    if (this.state.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  private play() {
    const audioNode = audioContext.createBufferSource()
    audioNode.buffer = this.props.audioBuffer
    audioNode.connect(audioContext.destination)
    audioNode.start(0, this.startPosition)
    audioNode.onended = this.onPlayEnd
    this.audioNode = audioNode
    this.startMS = Date.now()
    this.setState({ isPlaying: true })
    this.startSync()
  }

  private pause() {
    this.isPause = true
    this.audioNode?.stop()
  }

  private startSync() {
    this.stopSync()
    this.intervalId = window.setInterval(() => {
      const curPosition = this.state.isPlaying
        ? this.startPosition + (Date.now() - this.startMS) / 1000
        : this.startPosition
      this.setState({
        position: curPosition / this.props.audioBuffer.duration,
      })
    }, 60)
  }

  private stopSync() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private onClickStop = () => {
    this.isPause = false
    this.audioNode?.stop()
    if (!this.state.isPlaying) {
      this.startPosition = 0
      this.setState({ position: 0 })
    }
  }

  private onPlayEnd = () => {
    console.log('stop')
    if (this.audioNode) {
      this.audioNode.onended = null
      this.audioNode.stop()
      this.audioNode = null
    }
    this.setState({ isPlaying: false })
    if (this.isPause) {
      const played = Date.now() - this.startMS
      this.startPosition += played / 1000
      if (this.startPosition >= this.props.audioBuffer.duration) {
        this.startPosition = 0
      }
      this.isPause = false
    } else {
      this.startPosition = 0
      this.setState({ position: 0 })
    }
    this.stopSync()
  }

  private onPositionChangeStart = () => {
    this.pause()
    this.wasPlay = this.state.isPlaying
  }

  private onPositionChange = (value: number) => {
    this.setState({ position: value })
    this.startPosition = value * this.props.audioBuffer.duration
  }

  private onPositionChangeEnd = () => {
    if (this.wasPlay) {
      this.play()
    }
  }

  componentWillUnmount(): void {
    this.stopSync()
  }

  render(): ReactNode {
    const { isPlaying, position } = this.state
    return (
      <div>
        <button
          title={isPlaying ? '暂停' : '播放'}
          onClick={this.onTogglePlaying}
        >
          {isPlaying ? <div className="pause" /> : <div className="play" />}
        </button>
        <button title="停止" onClick={this.onClickStop}>
          <div className="stop" />
        </button>
        <Slider
          value={position}
          onValueChange={this.onPositionChange}
          onValueChangeStart={this.onPositionChangeStart}
          onValueChangeEnd={this.onPositionChangeEnd}
        />
      </div>
    )
  }
}

export default SoundPlayer
