const fs = require('fs');
const path = require('path');
const formatter = require('./formatter');

// 测试自定义规则
function testCustomRules() {
    const testCases = [
        {
            name: '清理标题中的序号',
            input: '### 1.2 标题',
            expected: '### 标题\n\n'
        },
        {
            name: '删除HTML标签',
            input: '<font color=red>红色文字</font>',
            expected: '红色文字'
        },
        {
            name: '移除加粗符号',
            input: '**加粗内容**',
            expected: '加粗内容'
        },
        {
            name: '处理分隔线',
            input: '---',
            expected: ''
        },
        {
            name: '综合测试',
            input: '### 1.2 标题\n<font color=red>红色文字</font>\n**加粗内容**\n---',
            expected: '### 标题\n\n\n红色文字\n加粗内容\n\n\n'
        }
    ];

    console.log('=== 自定义规则测试 ===');
    testCases.forEach(test => {
        const result = formatter.format(test.input);
        console.log(`测试: ${test.name}`);
        console.log(`输入: ${JSON.stringify(test.input)}`);
        console.log(`输出: ${JSON.stringify(result)}`);
        console.log(`期望: ${JSON.stringify(test.expected)}`);
        console.log(`结果: ${result === test.expected ? '通过' : '失败'}`);
        console.log('---');
    });
}

// 运行测试
testCustomRules();

console.log('\n=== 测试完成 ===');
console.log('请查看测试结果。若有失败的测试，请检查formatter.js中的实现。');
console.log('你也可以运行debug-helper.js来测试整个文件的格式化效果。');