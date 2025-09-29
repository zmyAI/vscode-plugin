/**
 * VuePress文档格式化器
 * 专门用于处理从VuePress的Markdown文档格式
 * 不处理分隔线，列表项之间没有空行
 */
const { MarkdownFormatter } = require('./formatter');

class VuePressMarkdownFormatter extends MarkdownFormatter {
    /**
     * 格式化从VuePress导出的Markdown文本
     * 保留代码块内部格式，仅格式化代码块外部的文本
     * @param {string} text - 要格式化的Markdown文本
     * @returns {string} 格式化后的文本
     */
    formatVuePress(text) {
        let result = text;

        // 1. 统一换行符为Unix格式（LF）
        result = super.normalizeLineEndings(result);

        // 2. 保存代码块内容，避免后续处理影响代码块内部格式
        const codeBlocks = [];
        const codeBlockRegex = /```([\s\S]*?)```/g;
        let match;
        let processedText = result;
        let placeholderIndex = 0;
        
        // 用占位符替换代码块并保存原始代码块
        while ((match = codeBlockRegex.exec(result)) !== null) {
            codeBlocks.push(match[0]);
            const placeholder = `__CODE_BLOCK_PLACEHOLDER_${placeholderIndex}__`;
            processedText = processedText.replace(match[0], placeholder);
            placeholderIndex++;
        }

        // 3. 删除特定HTML标签 (如 <font>、<br />)
        processedText = super.removeSpecificHtmlTags(processedText);

        // 4. 移除多余的符号 (如 ** 加粗符号)
        processedText = super.removeExtraSymbols(processedText);

        // 5. 清理标题中的序号
        processedText = super.cleanupHeadingNumbers(processedText);

        // 不处理分隔线（与原格式化器的区别）
        // processedText = super.handleHorizontalRules(processedText);

        // 6. 在标题后添加空行
        processedText = super.addEmptyLinesAfterHeadings(processedText);

        // 7. 合并多个连续空行
        processedText = super.mergeConsecutiveEmptyLines(processedText);

        // 8. 恢复代码块内容
        codeBlocks.forEach((codeBlock, index) => {
            const placeholder = `__CODE_BLOCK_PLACEHOLDER_${index}__`;
            processedText = processedText.replace(placeholder, `\n${codeBlock}\n`);
        });

        return processedText;
    }

    /**
     * 调整代码块前后的空行
     * 代码块内部保持原样，不添加额外空行
     * @param {string} text - 要处理的Markdown文本
     * @returns {string} 处理后的文本
     */
    adjustCodeBlockSpacing(text) {
        // 保持代码块原样，不添加额外的空行
        return text;
    }

    /**
     * 调整列表项之间的间距
     * 列表项之间不添加空行（与原格式化器的区别）
     * @param {string} text - 要处理的Markdown文本
     * @returns {string} 处理后的文本
     */
    adjustListSpacing(text) {
        // 保持列表项原样，不添加额外的空行
        return text;
    }
}

module.exports = { VuePressMarkdownFormatter };