# VuePress Include Parser

一个VS Code插件，用于将VuePress文档中的 `<!-- @include:xxx.md -->` 标记替换为对应文件的内容。

## 功能

- 解析Markdown文件中的 `<!-- @include:xxx.md -->` 标记
- 自动读取并替换为对应文件的内容，支持相对路径查找文件
- 提供右键菜单快捷操作

## 安装方法

1. 下载插件的VSIX文件
2. 在VS Code中选择 `扩展` > `从VSIX安装...`
3. 选择下载的VSIX文件进行安装

## 使用方法

1. 打开包含 `<!-- @include:xxx.md -->` 标记的Markdown文件
2. 右键点击编辑器，选择 `解析VuePress Include标记`
3. 插件会自动替换所有include标记为对应文件的内容

## 注意事项

- 插件使用相对路径查找文件，基于当前打开的Markdown文件位置
- 如果文件不存在或无法读取，插件会显示警告并保留原标记
- 为避免重复读取，插件会缓存已读取的文件内容和修改时间
- 插件能够检测被包含文件是否已修改，并在文件修改时自动更新内容

## 开发说明

### 项目结构

```
vuepress-include-parser/
├── extension.js       # 插件主入口文件
├── package.json       # 插件配置文件
├── .gitignore         # Git忽略文件配置
├── .vscodeignore      # VS Code插件打包忽略配置
└── README.md          # 插件说明文档
```

### 开发环境搭建

1. 克隆仓库
2. 运行 `npm install` 安装依赖
3. 使用VS Code打开项目
4. 按F5启动调试会话，会打开一个新的VS Code窗口加载插件

### 打包插件

运行 `vsce package` 命令打包插件，生成VSIX文件。

## License

MIT