import { CancellationToken, CustomDocument, CustomDocumentOpenContext, CustomReadonlyEditorProvider, Uri, WebviewPanel } from 'vscode'
import { SoundPlayerDocument } from './SoundPlayerDocument'

export class SoundPlayerProvider implements CustomReadonlyEditorProvider<SoundPlayerDocument> {

    openCustomDocument(uri: Uri): Promise<SoundPlayerDocument> {
        throw new Error('Method not implemented.')
    }

    resolveCustomEditor(document: SoundPlayerDocument, webviewPanel: WebviewPanel): Promise<void> {
        throw new Error('Method not implemented.')
    }

}