import { CustomDocument, Uri } from 'vscode'

export class SoundPlayerDocument implements CustomDocument {

    constructor(readonly uri: Uri) {

    }

    dispose(): void {

    }

}