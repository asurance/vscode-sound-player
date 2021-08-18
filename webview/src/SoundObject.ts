import { DecodeResult } from './interfaces'

const audioContext = new AudioContext()

export class SoundObject {
  private audioBuffer: AudioBuffer
  private audioNode: AudioBufferSourceNode | null = null
  private startMS = 0
  private startPosition = 0
  constructor(data: DecodeResult) {
    const audioBuffer = audioContext.createBuffer(
      data.channelCount,
      data.channelData.length,
      data.sampleRate,
    )
    for (let i = 0; i < data.channelCount; i++) {
      audioBuffer.copyToChannel(data.channelData, i)
    }
    this.audioBuffer = audioBuffer
  }

  play(): void {
    if (this.audioNode) return
    const audioNode = audioContext.createBufferSource()
    audioNode.buffer = this.audioBuffer
    audioNode.connect(audioContext.destination)
    audioNode.start(0, this.startPosition)
    audioNode.onended = this.onPlayEnd
    this.audioNode = audioNode
    this.startMS = Date.now()
  }

  pause(): void {
    this.destoryAudioNode()
    const played = Date.now() - this.startMS
    this.startPosition += played / 1000
    if (this.startPosition >= this.audioBuffer.duration) {
      this.startPosition = 0
    }
  }

  stop(): void {
    this.destoryAudioNode()
    this.startPosition = 0
  }

  get isPlaying(): boolean {
    return this.audioNode !== null
  }

  get position(): number {
    if (this.isPlaying) {
      return this.startPosition + (Date.now() - this.startMS) / 1000
    } else {
      return this.startPosition
    }
  }

  get length(): number {
    return this.audioBuffer.duration
  }

  private onPlayEnd = () => {
    this.destoryAudioNode()
    this.startPosition = 0
  }

  private destoryAudioNode() {
    if (this.audioNode) {
      this.audioNode.onended = null
      this.audioNode.stop()
      this.audioNode = null
    }
  }
}
