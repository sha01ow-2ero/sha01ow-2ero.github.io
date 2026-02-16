marked.setOptions
({
    gfm:true,//启用 GitHub Flavored Markdown 语法支持（如任务列表、@ 符号提及等）
    pedantic:false,//启用严格模式，遵循CommonMark规范。
    sanitize:false,//启用HTML内容净化，防止XSS攻击（建议处理不可信输入时使用）
    tables:true,//启用Markdown表格支持
    breaks:false,//允许段落自动换行
    smartLists:true,//优化列表标记（如将数字转换为阿拉伯数字）
    smartypants:false//优化引号、破折号等特殊符号的渲染
});