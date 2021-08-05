# 制作插件扩展语言包

插件扩展，是指HBuilderX内置插件、或可在HBuilderX运行的插件。

HBuilderX优先查找插件扩展中的对应的翻译文件，然后再查找语言包中对应插件扩展的翻译文件。


插件扩展的目录结构：
```shell
插件目录 /
    package.json
    package.nls.json			主语言翻译键值对应数据
    package.nls.[语言id].json	特定语言翻译键值对应关系
```

## 插件扩展package.json

插件扩展package.json中需要进行根据HBuilderX当前语言进行翻译的值使用`%键名%`来表达。

比如`%description%`,此时HBuilderX会优先查找`插件扩展目录`中(`package.nls.json`或`package.nls.[对应语言id].json`)的翻译文件


```json
// 插件扩展package.json
{
    "name": "xxxxx",
    "description": "%description%",
    "displayName": "%displayname%",
    "version": "x.x.x"
}
```

## 插件语言国际化示例
    
以【markdown-share】插件为例，目录结构如下：

```shell
markdown-share /
    package.json
    package.nls.json 
    package.nls.en.json	  # 英语语言包 
```

插件package.json内容如下:

```JSON
{
    "name": "markdown-share",
    "description": "%description%",
    "displayName": "%displayname%"
}
```

### package.nls.json

```JSON
{	
    "description": "一键分享markdown"	
}
```
 
### package.nls.en.json

> package.nls.[对应语言id].json, 优先于package.nls.json匹配
 
```JSON
{	
    "description": "一键分享markdown"	,
    "displayname": "一键分享"
}
```

使用该文件，插件扩展中的package.json里有包含`%description%`字样的值时，该值将会被替换成翻译文件中对应的值(如:一键分享markdown,而%displayname%被替换为一键分享)

### 语言包中的package.json

语言包(比如hx-language-pack-en)中的package.json, 优先于插件扩展目录下的package.nls.[对应语言id].json匹配

```JSON
{
    "name": "language-pack-xxx",
    "displayName": "xxx language package",
    "description": "xxx language package",
    "version": "0.0.1",
    "publisher": "publisher",	
    "license": "",	
    "engines": {
        "HBuilderX": "^3.1.21"
    },
    "icon": "",
    "categories": [
        "Language Packs"
    ],
    "contributes": {
        "localizations": [
            {
                "languageId": "xxx",
                "languageName": "xxxxx",
                "localizedLanguageName": "xxxxx",
                "translations": [
                    {
                        "id": "xxxxx",			
                        "path": "./extensions/xxxx"
                    }
                ]
                
            }
        ]
    }
}
```

其中 contributes->localizations->某个对应的语言->translations->对应id的插件扩展名称, 相关路径(path)的值描述了这个插件扩展对应语言文件相对与语言包的位置
比如:
```JSON
...
"translations": [
    ...
    ,{
        "id": "markdown-share",			
        "path": "./extensions/markdown-share.i18n.json"
    }
]
```


**语言包中的对应插件扩展的翻译文件(如markdown-share.i18n.json)**

```JSON
{
    ...
    "version": "1.0.0",
    "contents": {
        "package": {
            "displayname": "Markdown 语言基础功能",
            "description": "在 Markdown 文件中提供代码片段和语法高亮功能。"
        }
    }
}
```

>该文件要与当前语言包中的package.json中对应插件扩展id的path值对应上, 例子中是./extensions/markdown-share.i18n.json

>以上的例子当插件扩展中的package.nls.json、package.nls.[对应语言id].json和语言包中的翻译文件都存在时，最后得到的%displayname%和%description%分别是

__"Markdown 语言基础功能"__和__"在 Markdown 文件中提供代码片段和语法高亮功能。"__