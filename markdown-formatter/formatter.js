/**
 * Markdown格式化器
 */
class MarkdownFormatter {
    /**
     * 格式化Markdown文本
     * @param {string} text - 要格式化的Markdown文本
     * @returns {string} 格式化后的文本
     */
    format(text) {
        let result = text;

        // 1. 统一换行符为Unix格式（LF）
        result = this.normalizeLineEndings(result);

        // 2. 删除特定HTML标签 (如 <font>、<br />)
        result = this.removeSpecificHtmlTags(result);

        // 3. 移除多余的符号 (如 ** 加粗符号)
        result = this.removeExtraSymbols(result);

        // 4. 清理标题中的序号
        result = this.cleanupHeadingNumbers(result);

        // 5. 处理分隔线
        result = this.handleHorizontalRules(result);

        // 6. 在标题后添加空行
        result = this.addEmptyLinesAfterHeadings(result);

        // 7. 调整代码块前后的空行
        result = this.adjustCodeBlockSpacing(result);

        // 8. 调整列表项之间的间距
        result = this.adjustListSpacing(result);

        // 9. 合并多个连续空行
        result = this.mergeConsecutiveEmptyLines(result);

        return result;
    }

    /**
     * 统一换行符为Unix格式（LF）
     */
    normalizeLineEndings(text) {
        // 转换为Unix格式（LF）换行符
        return text.replace(/\r\n|\r|\n/g, '\n');
    }

    /**
     * 删除特定HTML标签
     */
    removeSpecificHtmlTags(text) {
        // 删除font标签（包括有空格的版本，如 < font>），但保留其内容
        text = text.replace(/<\s*\/?\s*font[^>]*>/g, '');
        // 删除br标签（包括有空格的版本）
        text = text.replace(/<\s*br\s*\/?\s*>/g, '\n');

        return text;
    }

    /**
     * 移除多余的符号
     */
    removeExtraSymbols(text) {
        // 移除**加粗符号，但保留内容
        text = text.replace(/\*\*(.*?)\*\*/g, '$1');

        // 可以在这里添加其他需要移除的符号

        return text;
    }

    /**
     * 清理标题中的序号
     */
    cleanupHeadingNumbers(text) {
        // 匹配标题中的序号 (如 ### 1.2 标题)
        // 保留井号和标题文本，删除序号
        return text.replace(/^(#{1,6})\s*[0-9.]+\s+(.*)$/gm, '$1 $2');
    }

    /**
     * 处理分隔线
     */
    handleHorizontalRules(text) {
        // 移除分隔线
        text = text.replace(/\*  \*  \*/gm,'');
        return text.replace(/^(---|\*\*\*|___)\s*$/gm, '');
    }

    /**
     * 在标题后添加空行
     */
    addEmptyLinesAfterHeadings(text) {
        // 在标题后添加两个空行
        return text.replace(/^(#{1,6})\s+.*$/gm, `$&\n\n`);
    }

    /**
     * 调整代码块前后的空行
     */
    adjustCodeBlockSpacing(text) {
        // 匹配代码块 (```开头和结尾)
        // 在代码块前后添加两个空行
        text = text.replace(/^(```.*)$/gm, '\n\n$1\n\n');
        return text;
    }

    /**
     * 调整列表项之间的间距
     */
    adjustListSpacing(text) {
        // 匹配列表项
        // 在列表项之间添加一个空行
        return text.replace(/^(\s*[-*+]|\s*\d+\.)\s+.*$/gm, '$&\n');
    }

    /**
     * 合并多个连续空行
     */
    mergeConsecutiveEmptyLines(text) {
        // 合并多个连续空行为一个空行
        return text.replace(/(\s*\r?\n){3,}/g, '\n\n');
    }
}

module.exports = { MarkdownFormatter };