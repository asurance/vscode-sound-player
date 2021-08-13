import { readFile } from 'fs'
import { resolve } from 'path'
import { Uri } from 'vscode'

export async function GetWebviewContent(rootPath: string): Promise<string> {
  const htmlPath = resolve(rootPath, 'index.html')
  const htmlContent = await new Promise<string>((resolve, reject) =>
    readFile(htmlPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    }),
  )
  return htmlContent.replace(
    /(<script.+?src="|<link.+?href=")(.+?)"/g,
    (match, $1, $2) => {
      return `${$1}${Uri.file(resolve(rootPath, $2)).with({
        scheme: 'vscode-resource',
      })}"`
    },
  )
}
