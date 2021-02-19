import { CustomDocument, Uri } from 'vscode'

export class SoundPlayerDocument implements CustomDocument {

    constructor(readonly uri: Uri) { }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispose(): void { }

}