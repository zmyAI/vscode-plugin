const vscode = require('vscode');
const formatter = require('./formatter');

/**
 * 激活插件
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // 注册格式化命令
    const disposable = vscode.commands.registerTextEditorCommand('doc-platform-markdown-optimizer.format', function(textEditor) {
        // 获取编辑器中的文档
        const document = textEditor.document;
        const text = document.getText();

        // 格式化文档内容
        const formattedText = formatter.format(text);

        // 替换文档内容
        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const range = new vscode.Range(firstLine.range.start, lastLine.range.end);

        textEditor.edit(editBuilder => {
            editBuilder.replace(range, formattedText);
        });

        vscode.window.showInformationMessage('文档平台导出Markdown优化成功！');
    });

    context.subscriptions.push(disposable);
}

/**
 * 失活插件
 */
function deactivate() {
}

module.exports = {
    activate,
    deactivate
};