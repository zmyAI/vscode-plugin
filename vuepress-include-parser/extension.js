const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * 激活插件
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // 注册解析include标记的命令
    const disposable = vscode.commands.registerTextEditorCommand('vuepress-include-parser.parse', async function(textEditor) {
        try {
            // 获取编辑器中的文档
            const document = textEditor.document;
            const text = document.getText();
            const filePath = document.uri.fsPath;
            const fileDir = path.dirname(filePath);

            // 解析include标记并替换为文件内容
            const parsedText = await parseIncludeTags(text, fileDir);

            // 将解析后的内容复制到剪贴板，而不是修改源文件
            await vscode.env.clipboard.writeText(parsedText);

            vscode.window.showInformationMessage('VuePress Include标记解析成功，内容已复制到剪贴板！');
        } catch (error) {
            vscode.window.showErrorMessage(`解析失败: ${error.message}`);
            console.error('解析include标记时出错:', error);
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * 解析文本中的include标记并替换为对应文件的内容
 * @param {string} text - 要解析的文本
 * @param {string} baseDir - 基础目录路径
 * @returns {Promise<string>} 解析后的文本
 */
async function parseIncludeTags(text, baseDir) {
    // 匹配 <!-- @include:xxx.md --> 格式的标记
    const includeRegex = /<!--\s*@include:([^>]+?)\s*-->/g;
    let result = text;
    let match;
    
    // 使用Map来缓存已读取的文件内容和修改时间
    const fileCache = new Map();

    // 找出所有匹配的include标记
    const matches = [];
    while ((match = includeRegex.exec(text)) !== null) {
        matches.push({ fullMatch: match[0], filePath: match[1], index: match.index });
    }

    // 从后往前替换，避免索引偏移问题
    for (let i = matches.length - 1; i >= 0; i--) {
        const { fullMatch, filePath, index } = matches[i];
        let fileContent = '';

        try {
            // 构建完整的文件路径
            const fullFilePath = path.resolve(baseDir, filePath);
            
            // 检查文件是否存在
            if (!fs.existsSync(fullFilePath)) {
                throw new Error(`文件不存在: ${filePath}`);
            }
            
            // 获取文件的当前修改时间
            const currentMtime = fs.statSync(fullFilePath).mtime.getTime();
            
            // 检查缓存，如果有缓存且文件未修改，则使用缓存内容
            const cached = fileCache.get(filePath);
            if (cached && cached.mtime === currentMtime) {
                fileContent = cached.content;
            } else {
                // 读取文件内容
                fileContent = fs.readFileSync(fullFilePath, 'utf8');
                
                // 缓存文件内容和修改时间
                fileCache.set(filePath, {
                    content: fileContent,
                    mtime: currentMtime
                });
            }

            // 替换include标记为文件内容
            result = result.substring(0, index) + fileContent + result.substring(index + fullMatch.length);
        } catch (error) {
            // 如果读取文件失败，显示警告但继续处理其他标记
            vscode.window.showWarningMessage(`无法读取文件 ${filePath}: ${error.message}`);
            // 保留原标记，不进行替换
        }
    }

    return result;
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