import React, { Component, ReactElement } from 'react'
import Error from './Error'
import Loading from './Loading'
import SoundPlayer from './SoundPlayer'

type State = {
    audioData: AudioData | null
    error: ErrorMessage | null,
}

export default class App extends Component<unknown, State> {
    constructor(props: unknown) {
        super(props)
        this.state = {
            audioData: null,
            error: null,
        }
    }

    componentDidMount(): void {
        window.addEventListener('message', this.onMessage)
    }

    private onMessage = (ev: MessageEvent<AudioData | ErrorMessage>) => {
        switch (ev.data.type) {
            case 'audioData':
                this.setState({ audioData: ev.data })
                break
            case 'error':
                this.setState({ error: ev.data })
                break

        }
    }

    render(): ReactElement {
        const {
            audioData,
            error,
        } = this.state
        if (audioData) {
            return <SoundPlayer audioData={audioData} />
        } else if (error) {
            return <Error message={error.message} />
        } else {
            return <Loading />
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('message', this.onMessage)
    }
}