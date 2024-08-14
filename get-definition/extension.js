const vscode = require('vscode');
const JSSoup = require('jssoup').default;
const fetch  = require('node-fetch').default;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "get-definition" is now active!');
	
	var functionExpression = async () => {
		const process= require('process');
		process.removeAllListeners('warning');

		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;

		if (selection && !selection.isEmpty) {
    		const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    		const arg = editor.document.getText(selectionRange);

			if (arg.length === 0) {
				return;
			}

			try {
				let url = `https://docs.microsoft.com/api/search?search=${arg}&scope=Desktop&locale=en-us&%24filter=scopes%2Fany(t%3A%20t%20eq%20%27Desktop%27)&facet=category&%24top=1`;
				var response = await fetch(url);
			}
			catch (error)
			{
				return;
			}
		
			try {
				var body = await response.json();;
			}
			catch (error)
			{
				return;
			}

			var d = body['results'][0]['url'];
			var fr = await fetch(d);
			var fd = await fr.text();
		
			var soup = new JSSoup(fd);
			var jk = soup.findAll('td', {style: "text-align: left;"});
		
			const re = new RegExp("(.*.DLL$|.*.dll$)");
			const matcher = jk[jk.length - 1].getText().match(re);

			const headers = new RegExp("(.*h|.*.H)");
			const matcher1 = jk[jk.length - 3].getText().match(headers);
		
			if (matcher !== null)
			{
				vscode.window.showInformationMessage(jk[jk.length - 1].getText().split('.')[0].toUpperCase() + "$" + arg);
			}

			if (matcher1 !== null)
			{
				vscode.window.showInformationMessage("Headers: " + jk[jk.length - 3].getText());
			}
		}
	}

	let disposable = vscode.commands.registerCommand('get-definition.getDefinition', functionExpression);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
