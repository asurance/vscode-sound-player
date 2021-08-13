import {
  CustomReadonlyEditorProvider,
  ExtensionContext,
  Uri,
  WebviewPanel,
} from 'vscode'
import { SoundPlayerDocument } from './SoundPlayerDocument'
import { GetWebviewContent } from './Util'

export class SoundPlayerProvider
  implements CustomReadonlyEditorProvider<SoundPlayerDocument>
{
  private html: Promise<string>

  constructor(context: ExtensionContext) {
    this.html = GetWebviewContent(context.asAbsolutePath('public'))
  }

  openCustomDocument(uri: Uri): SoundPlayerDocument {
    return new SoundPlayerDocument(uri)
  }

  async resolveCustomEditor(
    document: SoundPlayerDocument,
    webviewPanel: WebviewPanel,
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
    }
    const html = await this.html
    webviewPanel.webview.html = html.replace(
      /<meta id="source".*?\/>/,
      `<meta id="source" src="${webviewPanel.webview.asWebviewUri(
        document.uri,
      )}">`,
    )
  }
}
