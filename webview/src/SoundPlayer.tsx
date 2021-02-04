import React, { PureComponent, ReactElement } from 'react'
import { GetAudioBuffer, GetAudioContext } from './util'

type Props = {
    audioData: AudioData;
}

type State = {
    isPlaying: boolean
}

export default class SoundPlayer extends PureComponent<Props, State>{

    private audioNode: AudioBufferSourceNode | null = null

    constructor(props: Readonly<Props>) {
        super(props)
        this.state = {
            isPlaying: false
        }
    }

    private onClickStop = () => {
        if (this.audioNode === null) return
        this.audioNode.stop()
        this.onPlayEnded()
    }

    private onClickStart = () => {
        const {
            audioData,
        } = this.props
        const audioContext = GetAudioContext()
        const audioBuffer = GetAudioBuffer(audioData)
        this.audioNode = audioContext.createBufferSource()
        this.audioNode.buffer = audioBuffer
        this.audioNode.addEventListener('ended', this.onPlayEnded)
        this.audioNode.connect(audioContext.destination)
        this.audioNode.start()
        this.setState({ isPlaying: true })
    }

    private onPlayEnded = () => {
        this.audioNode = null
        this.setState({ isPlaying: false })
    }

    render(): ReactElement {
        const {
            isPlaying
        } = this.state
        if (isPlaying) {
            return <button onClick={this.onClickStop}>停止</button>
        } else {
            return <button onClick={this.onClickStart}>播放</button>
        }
    }

}