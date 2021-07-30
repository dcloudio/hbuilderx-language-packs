# HX语言包制作指南

HBuilderX语言包目录结构：

```
./
|--- package.json  入口文件
|--- main.i18n.json  HBuilderX编辑器翻译文件（包含菜单翻译等），文件名可以自定义
|--- extensions/	扩展插件翻译文件目录    
    |--- ls.i18n.json    HBuilderX语法库词条翻译
    |--- xx.i18n.json    插件翻译文件，文件名可以自定义
```

下面我们将依次介绍相关内容：

- package.json
- [HBuilderX编辑器语言文件](#HBuilderX编辑器语言文件)
- [HBuilderX插件扩展语言包](#HBuilderX插件扩展语言包)
- [HBuilderX语法库语言包](#HBuilderX语法库语言包)

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

contributes->localizations->languageId，必须为以下的值，下面罗列了部分languageID，[更多languageId参考](docs/localizations.md)

|语言代码	|国家(地区)						|
|--			|--								|
|zh_HK		|中文 - 香港				|
|zh_TW		|中文 -台湾地区						|
|zh_CHT		|中文(繁体)					|
|en_US		|英国 - 美国					|



## HBuilderX编辑器语言文件

- 文件必须为json格式
- 跟节点必须是contents字段

制作语言包之前，我们需要先根据【HBuilderX语言包目录结构】创建两个文件`package.json`和`main.i18n.json`

下面，我们将演示如何制作一份英文语言包

### 示例：制作英文语言包

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

##### man.i18n.json

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


## HBuilderX插件扩展语言包

插件扩展，是指HBuilderX内置插件、或可在HBuilderX运行的插件。

[插件扩展语言包制作教程](extensions.md)

## HBuilderX语法库语言包

- [语法库词条翻译](语法库翻译词条.md)