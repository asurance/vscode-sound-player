import { CustomDocument, Uri } from 'vscode'
import { DecodeAudio, LoadArrayBuffer, LogError } from './Util'

export class SoundPlayerDocument implements CustomDocument {

    readonly parseResult: Promise<AudioData | ErrorMessage>

    constructor(readonly uri: Uri) {
        this.parseResult = this.loadAndParse(uri)
    }

    private async loadAndParse(uri: Uri): Promise<AudioData | ErrorMessage> {
        const buffer = await LoadArrayBuffer(uri)
        try {
            const result = await DecodeAudio(buffer)
            const auidoData: AudioData = {
                type: 'audioData',
                numberOfChannels: result.numberOfChannels,
                length: result.length,
                sampleRate: result.sampleRate,
                channels: []
            }
            for (let i = 0; i < result.numberOfChannels; i++) {
                auidoData.channels.push(...result.getChannelData(i))
            }
            return auidoData
        } catch (e) {
            const error: ErrorMessage = {
                type: 'error',
                message: LogError(e)
            }
            return error
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispose(): void { }

}