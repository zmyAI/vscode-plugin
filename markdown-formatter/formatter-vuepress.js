/**
 * VuePress文档格式化器
 * 专门用于处理从VuePress的Markdown文档格式
 * 不处理分隔线，列表项之间没有空行
 */
const { MarkdownFormatter } = require('./formatter');

class VuePressMarkdownFormatter extends MarkdownFormatter {
    /**
     * 格式化从VuePress导出的Markdown文本
     * @param {string} text - 要格式化的Markdown文本
     * @returns {string} 格式化后的文本
     */
    formatVuePress(text) {
        let result = text;

        // 1. 统一换行符为Unix格式（LF）
        result = super.normalizeLineEndings(result);

        // 2. 删除特定HTML标签 (如 <font>、<br />)
        result = super.removeSpecificHtmlTags(result);

        // 3. 移除多余的符号 (如 ** 加粗符号)
        result = super.removeExtraSymbols(result);

        // 4. 清理标题中的序号
        result = super.cleanupHeadingNumbers(result);

        // 不处理分隔线（与原格式化器的区别）
        // result = super.handleHorizontalRules(result);

        // 5. 在标题后添加空行
        result = super.addEmptyLinesAfterHeadings(result);

        // 6. 调整代码块前后的空行
        result = super.adjustCodeBlockSpacing(result);

        // 7. 调整列表项之间的间距（不添加空行）
        // 注意：这里不调用super.adjustListSpacing，而是直接使用自定义逻辑

        // 8. 合并多个连续空行
        result = super.mergeConsecutiveEmptyLines(result);

        return result;
    }

    /**
     * 调整列表项之间的间距
     * 列表项之间不添加空行（与原格式化器的区别）
     * 注意：该方法在formatVuePress中不会被调用，这里提供是为了完整性
     */
    adjustListSpacing(text) {
        // 保持列表项原样，不添加额外的空行
        return text;
    }
}

module.exports = { VuePressMarkdownFormatter };