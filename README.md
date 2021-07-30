
# 代码仓库使用说明
## 本仓库提供HBuilderX可翻译的词条对应关系，HBuilderX在切换语言后根据指定的语言包自动提取词条进行文字替换达到界面翻译的效果
## 如何修改
 有需要的社区成员可使用git命令把本仓库代码拉取到本地，修改之后使用git命令提交并标注适当的commit说明，我们在通过检查审核后把修改后的内容合并到语言包中
 - 中文的修改内容将随安装包一起发布，通常下一个安装包内将包含此次修改的内容
 - 其他语言的修改内容将根据特定时机进行发布

# HX语言包制作指南

HBuilderX语言包目录结构：

```
./
|--- package.json  入口文件
|--- main.i18n.json  HBuilderX编辑器翻译文件（包含菜单翻译等），文件名可以自定义
|--- extensions/	扩展插件翻译文件目录    
    |--- ls.i18n.json    插件翻译文件，文件名可以自定义
```

## package.json格式

package.json完整示例如下：

```JSON
{
	"name": "hx-language-pack-zh-cn",
	"displayName": "HBuilderX中文语言包",
	"description": "HBuilderX中文语言包",
	"version": "0.0.1",
	"publisher": "HBuiderX",	
	"license": "SEE LICENSE IN LICENSE.md",	
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
				"languageId": "zh_CN",
				"languageName": "Chinese Simplified",
				"localizedLanguageName": "缺省中文(简体)",
				"translations": [
					{
						"id": "hbuilderx",
						"path": "./main.i18n.json"
					}
				]
				
			}
		]
	}
}
```

语言包package.json，字段解释如下

|字段	|说明	|备注	|
|--	|--	|--	|
|	name|语言包名称	|	|
|	displayName|语言包显示名称	|	|
|	description|	语言包描述|	|
|	version|语言包版本	|遵守“主版本.次要版本.补丁号”的格，|
|	publisher|发布者	|插件制作者	|
|	engines|HBuilderX运行引擎最低版本|数据类型`{ "HBuilderX":"^3.1.23"}`需对应HBuilderX版本|
|	tips|	语言包提示|[详情](#package.json语言包提示语)|
|license|授权协议|比如`MIT`|
|categories| HBuilderX插件所属分类|语言包字段应为:`["Language Packs"]` |
|contributes|语言声明| [详情](#package.json语言文件声明)|


##### package.json语言包提示语

> 在HBuilderX打开时检测语言环境并显示对应语言的通知栏提示，如果语言包中没有这些提示的对应翻译，HBuilderX将显示对应的英语内容

```JSON
"tips":{
    "setLanguageMessage": "当前语言已经设置为{1}",
    "missingLanguageMessage": "在语言包({2})中没有找到对应语言({1})",
    "askChangeLanguageMessage": "当前设置的缺省语言(中文(简体))与系统语言不同({1})",
    "changeToButton": "设置与系统语言一致"
}
```


##### package.json语言文件声明

```JSON
"contributes": {
    "localizations": [{
        "languageId": "zh_CN",
        "languageName": "Chinese Simplified",
        "localizedLanguageName": "中文(简体)",
        "translations":[
            {
                "id":"hbuilderx",
                "path": "./main.i18n.json"
            },
            {
                "id":"markdown-share",
                "path": "./extensions/markdown-share.i18n.json"
            }
        ]
    }]
}        
```

##### package.json localizations

contributes->localizations->languageId，必须为以下的值，下面罗列了部分languageID，[更多languageId参考](./localizations.md)

|语言代码	|国家(地区)						|
|--			|--								|
|zh_HK		|中文 - 香港				|
|zh_TW		|中文 -台湾地区						|
|zh_CHT		|中文(繁体)					|
|en_US		|英国 - 美国					|



## 安装
语言包安装完毕后，菜单上将会出现“语言设置”一项可供选择

> 这里需要截图

## HBuilderX编辑器语言文件

- 文件必须为json格式
- 跟节点必须是contents字段

举例: 文件main.i18n.json

```JSON
{
	"contents": {
		"CLisenceDialog": {
					"button.cancel.name": "取消(&C)",
					"button.confirm.name": "同意并继续(&M)"
				},
				"QColorDialog": {
					"button.pickColor.name": "拾取屏幕颜色"
				},
				"AboutDialog": {
					"dialog.Dialog.title": "",
					"label.HBuilderX.desc.subtitle": "",
					"label.version.desc": "",
					"label.Copyright©DCloudCoLtd.desc.link": ""
				},
				...
			}
	}
}
```

## 示例：制作英文语言包

##### package.json

```JSON
{
	"name": "language-pack-en",
	"displayName": "english language package",
	"description": "english language package",
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
				"languageId": "en",
				"languageName": "English",
				"localizedLanguageName": "English",
				"translations": [
					{
						"id": "hbuilderx",
						"path": "./main.i18n.json"
					}
				]
				
			}
		]
	}
}
```

英文语言键值对应
```JSON
{
	"contents": {
		"CLisenceDialog": {
					"button.cancel.name": "Cancel",
					"button.confirm.name": "Confirm"
				},
				"QColorDialog": {
					"button.pickColor.name": "Pick Color"
				}
				...
			}
	}
}
```


## 制作插件扩展语言包

> HBuilderX优先查找插件扩展中的对应的翻译文件，然后再查找语言包中对应插件扩展的翻译文件

插件扩展package.json
```JSON
	{
		"name": "markdown-share",
		"description": "%description%",
		"displayName": "%displayname%",
		"version": "x.x.x"
    }
```


##### 插件扩展package.json

插件扩展package.json中需要进行根据HBuilderX当前语言进行翻译的值使用`%键名%`来表达。

比如`%description%`,此时HBuilderX会优先查找`插件扩展目录`中(`package.nls.json`或`package.nls.[对应语言id].json`)的翻译文件


**插件扩展的目录件**

```
插件目录 /
    package.json
    package.nls.json			主语言翻译键值对应数据
    package.nls.[语言id].json	特定语言翻译键值对应关系
```
	
	
###### package.nls.json

```JSON
{	
	"version": "1.0.0",
	"contents": {
		"package": {
			"description": "一键分享markdown"					
		}		
	}
}
```
 
###### package.nls.[对应语言id].json

> package.nls.[对应语言id].json, 优先于package.nls.json匹配
 
```JSON
{	
	"version": "1.0.0",
	"contents": {
		"package": {
			"description": "一键分享markdown"	,
			"displayname": "一键分享"
		}
			
	}
}
```

使用该文件，插件扩展中的package.json里有包含`%description%`字样的值时，该值将会被替换成翻译文件中对应的值(如:一键分享markdown,而%displayname%被替换为一键分享)

###### 语言包(比如hx-language-pack-en)中的package.json

优先于插件扩展目录下的package.nls.[对应语言id].json匹配

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
					...
					,{
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


## 参考
# [本地化语言ID](./localizations.md)
# [语法库词条翻译](./语法库翻译词条.md)