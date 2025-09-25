# VuePress Include Parser 测试文件

这个文件用于测试VuePress Include Parser插件的功能。

## 测试1：基本的include标记

下面应该包含test-include-content.md文件的内容：

<!-- @include:test-include-content.md -->

## 测试2：多个include标记

<!-- @include:test-include-content.md -->

再次包含相同的文件，测试缓存功能：

<!-- @include:test-include-content.md -->

## 测试3：不存在的文件

这个include标记引用的是不存在的文件，应该显示警告并保留原标记：

<!-- @include:not-exist-file.md -->