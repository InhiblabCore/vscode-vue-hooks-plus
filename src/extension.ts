import * as vscode from "vscode";
import { HomeViewProvider } from "./views/HomeView";

export function activate(context: vscode.ExtensionContext) {
  const homeViewProvider = new HomeViewProvider(context.extensionUri);

  const updateURL = () => {
    vscode.window
      .showInputBox({
        prompt: "Input New Iframe URL",
        placeHolder: "Example: https://inhiblabcore.github.io/docs/hooks",
      })
      .then((newURL) => {
        if (!newURL) {
          return;
        }
        const config = vscode.workspace.getConfiguration();
        config.update("vue-hooks-plus-view.iframe", newURL, true);
        vscode.window.showInformationMessage(`update success!`);
      });
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("vue-hooks-plus-view.updateURL", updateURL)
  );

  vscode.window.registerWebviewViewProvider(
    "vue-hooks-plus-view.home",
    homeViewProvider
  );
}

export function deactivate() {}
