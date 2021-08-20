// 此js文件供nodejs使用
// 功能: 传入相关的xml文件, 文件类型, 根据文件生成json文件
// 功能: 传入相关xml的目录, 生成目录下的所有文件的json文件
// node xmltojson.js -file ./js_core.ico -language javascript;
// node xmltojson.js -file ./js_core.ico -language html
// node xmltojson.js -file ./js_core.ico -language css
// node xmltojson.js -dir ./defs;

import {
    resolve
} from 'path';

import {
    jsonSortFromKey,
    createFolder,
    createFile
} from './toolFunction.js';

import {
    jsToJsonFromFile,
    getJsToJsonFromFolderData
} from './jsProcetor.js';

import {
    htmlToJsonFromFile,
    getHtmlToJsonFromFolderData
} from './htmlProcetor.js';

import {
    cssToJsonFromFile,
    getCssToJsonFromFolderData
} from './cssProcetor.js';


main()

function xmlToJsonFromFolder(fileFolder) {
    let js = fileFolder + '\\javascript';
    let html = fileFolder + '\\html';
    let css = fileFolder + '\\css';
    let jsonData = {};
    Object.assign(jsonData, getJsToJsonFromFolderData(js));
    Object.assign(jsonData, getHtmlToJsonFromFolderData(html));
    Object.assign(jsonData, getCssToJsonFromFolderData(css));
    let sortJsonData = jsonSortFromKey(jsonData);
    let jsonPath = resolve() + '\\new\\xmlToJson.json';
    createFolder(resolve() + '\\new\\');
    createFile(jsonPath, sortJsonData);
}

function main() {
    var args = process.argv.splice(2);
    if (args[0] === '-dir') {
        xmlToJsonFromFolder(args[1])
    } else if (args[0] === '-file') {
        if (args[3] === 'javascript') {
            jsToJsonFromFile(args[1]);
        } else if (args[3] === 'html') {
            htmlToJsonFromFile(args[1]);
        } else if (args[3] === 'css') {
            cssToJsonFromFile(args[1]);
        }
    } else {
        console.log('参数错误')
    }
}