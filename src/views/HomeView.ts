import * as vscode from "vscode";

export class HomeViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };
    webviewView.webview.html = this._getWebviewContent(
      webviewView.webview,
      this.extensionUri
    );
  }

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ) {
    const config = vscode.workspace
      .getConfiguration()
      .get("vscode-vue-hooks-plus.iframe");

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>VueHooks Plus View</title>
        </head>
        <body>
          <iframe style="width:100%;height:100vh;border:0" src="${config}"></iframe>
        </body>
      </html>
    `;
  }
}
