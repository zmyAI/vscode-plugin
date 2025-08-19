const fs = require('fs');
const path = require('path');
const formatter = require('./formatter');

// 测试合并连续空行功能
function testMergeConsecutiveEmptyLines() {
    const eol = require('os').EOL;
    const testCases = [
        {
            name: '合并2个空行',
            input: `文本${eol}${eol}文本`,
            expected: `文本${eol}文本`
        },
        {
            name: '合并3个空行',
            input: `文本${eol}${eol}${eol}文本`,
            expected: `文本${eol}文本`
        },
        {
            name: '合并多个空行',
            input: `文本${eol}${eol}${eol}${eol}${eol}文本`,
            expected: `文本${eol}文本`
        },
        {
            name: '没有空行',
            input: `文本${eol}文本`,
            expected: `文本${eol}文本`
        }
    ];

    console.log('=== 合并连续空行测试 ===');
    testCases.forEach(test => {
        // 通过format函数调用，确保换行符被正确标准化
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
testMergeConsecutiveEmptyLines();

console.log('\n=== 测试完成 ===');