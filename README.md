## HX语言包书写格式
语言包package.json
- 语言包名称
```JSON
"name": ""
``` 

- 语言包显示名称
```JSON
"displayName": ""
```
 
- 语言包描述
```JSON
"description": ""
```
 
- 语言包版本, 遵守“主版本.次要版本.补丁号”的格式
```JSON
"version": "n.n.n"
```

- 发布者
```JSON
"publisher":""
``` 

- 运行引擎
```JSON	
"engines":{
	"hbuilderx":"^n.n.n"
	}
``` 

- 语言包提示
```JSON
	"tips":{
		"setLanguageMessage": "当前语言已经设置为{1}",
		"missingLanguageMessage": "在语言包({2})中没有找到对应语言({1})",
		"askChangeLanguageMessage": "当前设置的缺省语言(中文(简体))与系统语言不同({1})",
		"changeToButton": "设置与系统语言一致"
	}
```
在HBuilderX打开时检测语言环境并显示对应语言的通知栏提示，如果语言包中没有这些提示的对应翻译，HBuilderX将显示对应的英语内容

- 授权协议
```JSON
"license":""
```

- 扩展所属分类
```JSON
"categories": [
	"Language Packs"
]
```

- 语言文件声明
```JSON
"contributes": {
			"localizations": [
				{
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
						},
						...
					]
```

- ```contributes->localizations->languageId``` 可以是以下的值

|语言代码	|国家(地区)						|
|--			|--								|
|af			|公用荷兰语						|
|af_ZA		|公用荷兰语 - 南非				|
|sq			|阿尔巴尼亚						|
|sq_AL		|阿尔巴尼亚 -阿尔巴尼亚			|
|ar			|阿拉伯语						|
|ar_DZ		|阿拉伯语 -阿尔及利亚			|
|ar_BH		|阿拉伯语 -巴林					|
|ar_EG		|阿拉伯语 -埃及					|
|ar_IQ		|阿拉伯语 -伊拉克				|
|ar_JO		|阿拉伯语 -约旦					|
|ar_KW		|阿拉伯语 -科威特				|
|ar_LB		|阿拉伯语 -黎巴嫩				|
|ar_LY		|阿拉伯语 -利比亚				|
|ar_MA		|阿拉伯语 -摩洛哥				|
|ar_OM		|阿拉伯语 -阿曼					|
|ar_QA		|阿拉伯语 -卡塔尔				|
|ar_SA		|阿拉伯语 - 沙特阿拉伯			|
|ar_SY		|阿拉伯语 -叙利亚共和国			|
|ar_TN		|阿拉伯语 -北非的共和国			|
|ar_AE		|阿拉伯语 - 阿拉伯联合酋长国	|
|ar_YE		|阿拉伯语 -也门					|
|hy			|亚美尼亚						|
|hy_AM		|亚美尼亚的 -亚美尼亚			|
|az			|Azeri							|
|az_AZ_Cyrl	|Azeri-(西里尔字母的) 阿塞拜疆	|
|az_AZ_Latn	|Azeri(拉丁文)- 阿塞拜疆		|
|eu			|巴斯克							|
|eu_ES		|巴斯克 -巴斯克					|
|be			|Belarusian						|
|be_BY		|Belarusian-白俄罗斯			|
|bg			|保加利亚						|
|bg_BG		|保加利亚 -保加利亚				|
|ca			|嘉泰罗尼亚						|
|ca_ES		|嘉泰罗尼亚 -嘉泰罗尼亚			|
|zh_HK		|中文 - 香港的 SAR				|
|zh_MO		|中文 - 澳门的 SAR				|
|zh_CN		|中文(简体)						|
|zh_CHS		|中文 (单一化)					|
|zh_SG		|中文 -新加坡						|
|zh_TW		|中文 -台湾地区						|
|zh_CHT		|中文(繁体)					|
|hr			|克罗埃西亚						|
|hr_HR		|克罗埃西亚 -克罗埃西亚			|
|cs			|捷克							|
|cs_CZ		|捷克 - 捷克					|
|da			|丹麦文							|
|da_DK		|丹麦文 -丹麦					|
|div		|Dhivehi						|
|div_MV		|Dhivehi-马尔代夫				|
|nl			|荷兰							|
|nl_BE		|荷兰 -比利时					|
|nl_NL		|荷兰 - 荷兰					|
|en			|英国							|
|en_AU		|英国 -澳洲						|
|en_BZ		|英国 -伯利兹					|
|en_CA		|英国 -加拿大					|
|en_CB		|英国 -加勒比海					|
|en_IE		|英国 -爱尔兰					|
|en_JM		|英国 -牙买加					|
|en_NZ		|英国 - 新西兰					|
|en_PH		|英国 -菲律宾共和国				|
|en_ZA		|英国 - 南非					|
|en_TT		|英国 - 千里达托贝哥共和国		|
|en_GB		|英国 - 英国					|
|en_US		|英国 - 美国					|
|en_ZW		|英国 -津巴布韦					|
|et			|爱沙尼亚						|
|et_EE		|爱沙尼亚的 -爱沙尼亚			|
|fo			|Faroese						|
|fo_FO		|Faroese- 法罗群岛				|
|fa			|波斯语							|
|fa_IR		|波斯语 -伊朗王国				|
|fi			|芬兰语							|
|fi_FI		|芬兰语 -芬兰					|
|fr			|法国							|
|fr_BE		|法国 -比利时					|
|fr_CA		|法国 -加拿大					|
|fr_FR		|法国 -法国						|
|fr_LU		|法国 -卢森堡					|
|fr_MC		|法国 -摩纳哥					|
|fr_CH		|法国 -瑞士						|
|gl			|加利西亚						|
|gl_ES		|加利西亚 -加利西亚				|
|ka			|格鲁吉亚州						|
|ka_GE		|格鲁吉亚州 -格鲁吉亚州			|
|de			|德国							|
|de_AT		|德国 -奥地利					|
|de_DE		|德国 -德国						|
|de_LI		|德国 -列支敦士登				|
|de_LU		|德国 -卢森堡					|
|de_CH		|德国 -瑞士						|
|el			|希腊							|
|el_GR		|希腊 -希腊						|
|gu			|Gujarati						|
|gu_IN		|Gujarati-印度					|
|he			|希伯来							|
|he_IL		|希伯来 -以色列					|
|hi			|北印度语						|
|hi_IN		|北印度的 -印度					|
|hu			|匈牙利							|
|hu_HU		|匈牙利的 -匈牙利				|
|is			|冰岛语							|
|is_IS		|冰岛的 -冰岛					|
|id			|印尼							|
|id_ID		|印尼 -印尼						|
|it			|意大利							|
|it_IT		|意大利 -意大利					|
|it_CH		|意大利 -瑞士					|
|ja			|日本							|
|ja_JP		|日本 -日本						|
|kn			|卡纳达语						|
|kn_IN		|卡纳达语 -印度					|
|kk			|Kazakh							|
|kk_KZ		|Kazakh-哈萨克					|
|kok		|Konkani						|
|kok_IN		|Konkani-印度					|
|ko			|韩国							|
|ko_KR		|韩国 -韩国						|
|ky			|Kyrgyz							|
|ky_KZ		|Kyrgyz-哈萨克					|
|lv			|拉脱维亚						|
|lv_LV		|拉脱维亚的 -拉脱维亚			|
|lt			|立陶宛							|
|lt_LT		|立陶宛 -立陶宛					|
|mk			|马其顿							|
|mk_MK		|马其顿 -FYROM					|
|ms			|马来							|
|ms_BN		|马来 -汶莱						|
|ms_MY		|马来 -马来西亚					|
|mr			|马拉地语						|
|mr_IN		|马拉地语 -印度					|
|mn			|蒙古							|
|mn_MN		|蒙古 -蒙古						|
|no			|挪威							|
|nb_NO		|挪威 (Bokm?l) - 挪威			|
|nn_NO		|挪威 (Nynorsk)- 挪威			|
|pl			|波兰							|
|pl_PL		|波兰 -波兰						|
|pt			|葡萄牙							|
|pt_BR		|葡萄牙 -巴西					|
|pt_PT		|葡萄牙 -葡萄牙					|
|pa			|Punjab 语						|
|pa_IN		|Punjab 语 -印度				|
|ro			|罗马尼亚语						|
|ro_RO		|罗马尼亚语 -罗马尼亚			|
|ru			|俄国							|
|ru_RU		|俄国 -俄国						|
|sa			|梵文							|
|sa_IN		|梵文 -印度						|
|sr_SP_Cyrl	|塞尔维亚 -(西里尔字母的) 塞尔	|
|sr_SP_Latn	|塞尔维亚 (拉丁文)- 塞尔维亚共	|
|sk			|斯洛伐克						|
|sk_SK		|斯洛伐克 -斯洛伐克				|
|sl			|斯洛文尼亚						|
|sl_SI		|斯洛文尼亚 -斯洛文尼亚			|
|es			|西班牙							|
|es_AR		|西班牙 -阿根廷					|
|es_BO		|西班牙 -玻利维亚				|
|es_CL		|西班牙 -智利					|
|es_CO		|西班牙 -哥伦比亚				|
|es_CR		|西班牙 - 哥斯达黎加			|
|es_DO		|西班牙 - 多米尼加共和国		|
|es_EC		|西班牙 -厄瓜多尔				|
|es_SV		|西班牙 - 萨尔瓦多				|
|es_GT		|西班牙 -危地马拉				|
|es_HN		|西班牙 -洪都拉斯				|
|es_MX		|西班牙 -墨西哥					|
|es_NI		|西班牙 -尼加拉瓜				|
|es_PA		|西班牙 -巴拿马					|
|es_PY		|西班牙 -巴拉圭					|
|es_PE		|西班牙 -秘鲁					|
|es_PR		|西班牙 - 波多黎各				|
|es_ES		|西班牙 -西班牙					|
|es_UY		|西班牙 -乌拉圭					|
|es_VE		|西班牙 -委内瑞拉				|
|sw			|Swahili						|
|sw_KE		|Swahili-肯尼亚					|
|sv			|瑞典							|
|sv_FI		|瑞典 -芬兰						|
|sv_SE		|瑞典 -瑞典						|
|syr		|Syriac							|
|syr_SY		|Syriac-叙利亚共和国			|
|ta			|坦米尔							|
|ta_IN		|坦米尔 -印度					|
|tt			|Tatar							|
|tt_RU		|Tatar-俄国						|
|te			|Telugu							|
|te_IN		|Telugu-印度					|
|th			|泰国							|
|th_TH		|泰国 -泰国						|
|tr			|土耳其语						|
|tr_TR		|土耳其语 -土耳其				|
|uk			|乌克兰							|
|uk_UA		|乌克兰 -乌克兰					|
|ur			|Urdu							|
|ur_PK		|Urdu-巴基斯坦					|
|uz			|Uzbek							|
|uz_UZ_Cyrl	|Uzbek-(西里尔字母的) 乌兹别克	|
|uz_UZ_Latn	|Uzbek(拉丁文)- 乌兹别克斯坦	|
|vi			|越南							|
|vi_VN		|越南 -越南						|



## 完整例子 语言包 package.json
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

## 安装
语言包安装完毕后，菜单上将会出现“语言设置”一项可供选择

## 语言键值对应关系
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

## 制作英文语言包

- package.json
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
						"path": "./main.i18n.en.json"
					}
				]
				
			}
		]
	}
}
```
- 英文语言键值对应
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

- __插件扩展package.json__
```JSON
	{
		"name": "markdown-share",
		"description": "%description%",
		"displayName": "%displayname%",
		"version": "x.x.x",
```



```插件扩展package.json```中需要进行根据HBuilderX当前语言进行翻译的值使用%键名%来表达,比如%description%,此时HBuilderX会优先查找插件扩展目录中(package.nls.json或package.nls.[对应语言id].json)的翻译文件


- 插件扩展的翻译文件

	插件扩展根目录 /
		package.json
		package.nls.json			主语言翻译键值对应数据
		package.nls.[语言id].json	特定语言翻译键值对应关系
		
 __package.nls.json__
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
 __package.nls.[对应语言id].json__ 优先于package.nls.json匹配
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

使用该文件，插件扩展中的package.json里有包含%description%字样的值时，该值将会被替换成翻译文件中对应的值(如:一键分享markdown,而%displayname%被替换为一键分享)

- __语言包(比如hx-language-pack-en)中的package.json__ 优先于插件扩展目录下的package.nls.[对应语言id].json匹配
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

- __语言包中的对应插件扩展的翻译文件(如markdown-share.i18n.json)__
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
>该文件要与当前语言包中的package.json中对应插件扩展id的path值对应上, 例子中是./translations/markdown-share.i18n.json

>以上的例子当插件扩展中的package.nls.json、package.nls.[对应语言id].json和语言包中的翻译文件都存在时，最后得到的%displayname%和%description%分别是
__"Markdown 语言基础功能"__和__"在 Markdown 文件中提供代码片段和语法高亮功能。"__