import { CustomReadonlyEditorProvider, ExtensionContext, Uri, WebviewPanel } from 'vscode'
import { SoundPlayerDocument } from './SoundPlayerDocument'
import { DecodeAudio, GetWebviewContent } from './Util'

export class SoundPlayerProvider implements CustomReadonlyEditorProvider<SoundPlayerDocument> {

    private html: Promise<string>

    constructor(context: ExtensionContext) {
        this.html = GetWebviewContent(context.asAbsolutePath('public'))
    }

    openCustomDocument(uri: Uri): SoundPlayerDocument {
        return new SoundPlayerDocument(uri)
    }

    async resolveCustomEditor(document: SoundPlayerDocument, webviewPanel: WebviewPanel): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true
        }
        const html = await this.html
        webviewPanel.webview.html = html
        const buffer = await document.buffer
        const audioBuffer = await DecodeAudio(buffer)
        const auidoData: AudioData = {
            numberOfChannels: audioBuffer.numberOfChannels,
            length: audioBuffer.length,
            sampleRate: audioBuffer.sampleRate,
            channels: []
        }
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            auidoData.channels.push(Array.from(audioBuffer.getChannelData(i)))
        }
        webviewPanel.webview.postMessage({ ...auidoData, type: 'audioData' })
    }
}