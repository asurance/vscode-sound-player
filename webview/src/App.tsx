import React, { Component, ReactElement } from 'react'
import SoundPlayer from './SoundPlayer'

type State = {
    audioData: AudioData | null
}

export default class App extends Component<unknown, State> {
    constructor(props: unknown) {
        super(props)
        this.state = {
            audioData: null
        }
    }

    componentDidMount(): void {
        window.addEventListener('message', this.onMessage)
    }

    private onMessage = (ev: MessageEvent<AudioData & { type: string }>) => {
        if (ev.data.type === 'audioData') {
            this.setState({ audioData: ev.data })
        }
    }

    render(): ReactElement {
        const {
            audioData,
        } = this.state
        if (audioData) {
            return <SoundPlayer audioData={audioData} />
        } else {
            return <span>加载中</span>
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('message', this.onMessage)
    }
}