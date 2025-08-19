const fs = require('fs');
const path = require('path');
const { MarkdownFormatter } = require('./formatter');
const formatter = new MarkdownFormatter();

// 读取测试文件
const testFilePath = path.join(__dirname, 'test.md');
const originalContent = fs.readFileSync(testFilePath, 'utf8');

console.log('=== 原始内容 ===');
console.log(originalContent);

// 格式化内容
const formattedContent = formatter.format(originalContent);

console.log('\n=== 格式化后内容 ===');
console.log(formattedContent);

// 写入格式化后的内容到新文件
const outputFilePath = path.join(__dirname, 'test-formatted.md');
fs.writeFileSync(outputFilePath, formattedContent, 'utf8');

console.log(`\n格式化完成！结果已保存到 ${outputFilePath}`);