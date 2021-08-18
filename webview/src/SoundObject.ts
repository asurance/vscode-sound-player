import { DecodeResult } from './interfaces'

const audioContext = new AudioContext()

export class SoundObject {
  private audioBuffer: AudioBuffer
  private audioNode: AudioBufferSourceNode | null = null
  private startMS = 0
  private curPosition = 0
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
    audioNode.start(0, this.curPosition)
    audioNode.onended = this.onPlayEnd
    this.audioNode = audioNode
    this.startMS = Date.now()
  }

  pause(): void {
    this.destoryAudioNode()
    const played = Date.now() - this.startMS
    this.curPosition += played / 1000
    if (this.curPosition >= this.audioBuffer.duration) {
      this.curPosition = 0
    }
  }

  stop(): void {
    this.destoryAudioNode()
    this.curPosition = 0
  }

  get isPlaying(): boolean {
    return this.audioNode !== null
  }

  get position(): number {
    return this.curPosition
  }

  private onPlayEnd = () => {
    this.destoryAudioNode()
    this.curPosition = 0
  }

  private destoryAudioNode() {
    if (this.audioNode) {
      this.audioNode.onended = null
      this.audioNode.stop()
      this.audioNode = null
    }
  }
}
