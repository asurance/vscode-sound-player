import { CustomDocument, Uri } from 'vscode'
import { LoadArrayBuffer } from './Util'

export class SoundPlayerDocument implements CustomDocument {

    readonly buffer: Promise<ArrayBuffer>

    constructor(readonly uri: Uri) {
        this.buffer = LoadArrayBuffer(uri)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispose(): void { }

}