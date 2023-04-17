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
        config.update("vscode-vue-hooks-plus.iframe", newURL, true);
        vscode.window.showInformationMessage(`update success!`);
      });
  };

  const resetConfig = () => {
    const config = vscode.workspace.getConfiguration();
    config.update(
      "vscode-vue-hooks-plus.iframe",
      "https://inhiblabcore.github.io/docs/hooks",
      true
    );
    vscode.window.showInformationMessage(`please reload window`);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-vue-hooks-plus.updateURL",
      updateURL
    ),
    vscode.commands.registerCommand("vscode-vue-hooks-plus.reset", resetConfig)
  );

  vscode.window.registerWebviewViewProvider(
    "vscode-vue-hooks-plus.home",
    homeViewProvider
  );
}

export function deactivate() {}
