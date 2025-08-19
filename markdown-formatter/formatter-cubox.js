const { MarkdownFormatter } = require('./formatter');

/**
 * Cubox文档格式化器
 * 专门用于处理从Cubox导出的Markdown文档格式
 */
class CuboxMarkdownFormatter extends MarkdownFormatter {
    /**
     * 格式化从Cubox导出的Markdown文本
     * @param {string} text - 要格式化的Markdown文本
     * @returns {string} 格式化后的文本
     */
    formatCubox(text) {
        let result = text;
        
        // 1. 移除Cubox特有标记 [mp.weixin.qq.com]
        result = this.removeCuboxSourceTags(result);
        
        // 2. 转换特定格式（如将"*\n  •"转换为"+"）
        result = this.convertSpecialFormats(result);
        
        // 3. 调用基础格式化方法进行通用格式化
        result = super.format(result);
        
        return result;
    }
    
    /**
     * 移除Cubox源标记
     */
    removeCuboxSourceTags(text) {
        // 移除 [mp.weixin.qq.com] 相关标记
        text = text.replace(/\[mp\.weixin\.qq\.com\].*/g, '');
        
        // 移除 [Read in Cubox] 链接
        text = text.replace(/\[Read in Cubox\]\(https:\/\/cubox\.pro\/my\/card\?id=.+\)/g, '');
        
        return text;
    }
    
    /**
     * 转换特定格式
     */
    convertSpecialFormats(text) {
        // 将"*\n  •"格式转换为"+"列表项
        text = text.replace(/\*\n  •/g, '+');
        
        // 将"  *\n    •"格式转换为"  -"列表项
        text = text.replace(/  \*\n    •/g, '  -');
        
        return text;
    }
}

module.exports = { CuboxMarkdownFormatter };