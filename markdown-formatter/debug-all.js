const fs = require('fs');
const path = require('path');
const { MarkdownFormatter } = require('./formatter');
const { CuboxMarkdownFormatter } = require('./formatter-cubox');

// 创建格式化器实例
const standardFormatter = new MarkdownFormatter();
const cuboxFormatter = new CuboxMarkdownFormatter();

// 读取测试文件
const standardTestFilePath = path.join(__dirname, 'test.md');
const cuboxTestFilePath = path.join(__dirname, 'test_cubox.md');

// 测试标准格式化
if (fs.existsSync(standardTestFilePath)) {
    const standardContent = fs.readFileSync(standardTestFilePath, 'utf8');
    console.log('=== 标准格式化 - 原始内容 ===');
    console.log(standardContent.substring(0, 300) + '...');

    const standardFormatted = standardFormatter.format(standardContent);
    console.log('\n=== 标准格式化 - 格式化后内容 ===');
    console.log(standardFormatted.substring(0, 300) + '...');

    const standardOutputPath = path.join(__dirname, 'test-formatted-standard.md');
    fs.writeFileSync(standardOutputPath, standardFormatted, 'utf8');
    console.log(`\n标准格式化完成！结果已保存到 ${standardOutputPath}`);
} else {
    console.log(`未找到标准测试文件: ${standardTestFilePath}`);
}

// 测试Cubox格式化
if (fs.existsSync(cuboxTestFilePath)) {
    const cuboxContent = fs.readFileSync(cuboxTestFilePath, 'utf8');
    console.log('\n=== Cubox格式化 - 原始内容 ===');
    console.log(cuboxContent.substring(0, 300) + '...');

    const cuboxFormatted = cuboxFormatter.formatCubox(cuboxContent);
    console.log('\n=== Cubox格式化 - 格式化后内容 ===');
    console.log(cuboxFormatted.substring(0, 300) + '...');

    const cuboxOutputPath = path.join(__dirname, 'test-formatted-cubox.md');
    fs.writeFileSync(cuboxOutputPath, cuboxFormatted, 'utf8');
    console.log(`\nCubox格式化完成！结果已保存到 ${cuboxOutputPath}`);
} else {
    console.log(`未找到Cubox测试文件: ${cuboxTestFilePath}`);
}

console.log('\n所有测试完成！');