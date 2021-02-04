import { ExtensionContext, window } from 'vscode'
import { SoundPlayerProvider } from './SoundPlayerProvider'

export function activate(context: ExtensionContext): void {
    context.subscriptions.push(window.registerCustomEditorProvider('asurance.soundplayer', new SoundPlayerProvider(context), {
        webviewOptions: {
            retainContextWhenHidden: false
        },
        supportsMultipleEditorsPerDocument: true,
    }))
}