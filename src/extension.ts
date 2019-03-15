import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { isUndefined } from 'util';

let acmeishCommand: string | undefined
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('acmeish.captureCommand', () => {

		let text = get_current_selection();
		if (isUndefined(text)) {
			clearCurrentCommand();
			return;
		}
		text = text.trimLeft();

		if (text.length == 0) {
			clearCurrentCommand();
			return
		}

		statusBarItem.text = "acmeish: '" + text + "'";
		statusBarItem.show();
		vscode.window.showInformationMessage("New acmeish command saved.");
		acmeishCommand = text;
	}));



	context.subscriptions.push(vscode.commands.registerCommand('acmeish.runCommand', () => {

		if (acmeishCommand == undefined) {
			vscode.window.showInformationMessage('No acmeish command set.');
			return;
		}

		let toRun = acmeishCommand;
		let input = "";
		if (acmeishCommand.startsWith("|")) {
			toRun = toRun.substr(1);
			input = get_current_selection();
			if (isUndefined(input)) {
				return;
			}
		}

		try {
			const output = child_process.execSync(toRun, {
				"input": input,
				"timeout": 10000,
				"maxBuffer": 1000000,
				"windowsHide": true
			})
			const selection = vscode.window.activeTextEditor.selection;
			vscode.window.activeTextEditor.edit(eb => {
				eb.replace(selection, output.toString());
			})
		} catch (e) {
			vscode.window.showErrorMessage(e);
		}
	}));


	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'acmeish.runCommand';
	statusBarItem.text = "";
	statusBarItem.tooltip = "Run this command.";
	context.subscriptions.push(statusBarItem);

}

function clearCurrentCommand() {
	statusBarItem.text = "";
	statusBarItem.hide();
	acmeishCommand = undefined;
}

function get_current_selection() {

	const editor = vscode.window.activeTextEditor;
	if (isUndefined(editor)) {
		vscode.window.showInformationMessage('No active text editor.');
		return undefined;
	}
	const selection = editor.selection;
	if (isUndefined(selection)) {
		vscode.window.showInformationMessage('No active selection.');
		return undefined;
	}

	if (selection.isEmpty) {
		return editor.document.lineAt(selection.start.line).text;
	} else {
		return editor.document.getText(selection);
	}
}

export function deactivate() { }
