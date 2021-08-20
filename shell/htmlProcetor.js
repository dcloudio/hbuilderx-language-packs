// 此js文件供nodejs使用
// 功能: 传入html相关的xml文件, 根据xml文件生成json文件

import {
    basename,
    resolve
} from 'path';

import {
    fileIsExist,
    folderIsExist,
    createFolder,
    createFile,
    getSubPathName,
    getSubFileName,
    getSubFilePath,
    objIsEmpty,
    getALLKey,
    getValue,
    jsonSortFromKey,
    getJsonFromXml
} from './toolFunction.js';


// 获取description的数据
function getDescriptionJson(parent, desObj) {
    let jsonData = {};
    let key = parent + '.description';
    let value;
    if (desObj.hasOwnProperty('description')) {
        let description = desObj.description;
        if (description.hasOwnProperty('_text')) {
            value = description._text;
        } else if (description.hasOwnProperty('_cdata')) {
            value = description._cdata;
        } else {
            value = '';
        }
        jsonData[key] = value;
    }
    return jsonData;
}

// 获取example的数据
function getExampleJson(parent, exaObj) {
    let jsonData = {};
    let key = parent + '.example';
    let value;
    if (exaObj.hasOwnProperty('example')) {
        let example = exaObj.example;
        if (example.hasOwnProperty('_text')) {
            value = example._text;
        } else if (example.hasOwnProperty('_cdata')) {
            value = example._cdata;
        } else {
            value = '';
        }
        jsonData[key] = value;
    }
    return jsonData;
}

// 获取remarks的数据
function getRemarksJson(parent, exaObj) {
    let jsonData = {};
    let key = parent + '.remarks';
    let value;
    if (exaObj.hasOwnProperty('remarks')) {
        let remarks = exaObj.remarks;
        if (remarks.hasOwnProperty('_text')) {
            value = remarks._text;
        } else if (remarks.hasOwnProperty('_cdata')) {
            value = remarks._cdata;
        } else {
            value = '';
        }
        jsonData[key] = value;
    }
    return jsonData;
}

// 獲取elements节点的数据
function getElementsJson(xmlClass) {
    let elementsJson = {};
    let key;
    if (xmlClass.hasOwnProperty('elements')) {
        if (xmlClass.elements.hasOwnProperty('element')) {
            if (Array.isArray(xmlClass.elements.element)) {
                let element = xmlClass.elements.element;
                for (let subElement of element) {
                    key = '_.element.' + subElement._attributes.name;
                    Object.assign(elementsJson, getAllSubJson(elementsJson, key, subElement));
                }
            } else {
                let subElement = xmlClass.elements.element;
                key = '_.element.' + subElement._attributes.name;
                Object.assign(elementsJson, getAllSubJson(elementsJson, key, subElement));
            }
        }
    }
    return elementsJson;
}

// 獲取attributes节点的数据
function getAttributesJson(xmlClass) {
    let attributesJson = {};
    let key;
    if (xmlClass.hasOwnProperty('attributes')) {
        if (xmlClass.attributes.hasOwnProperty('attribute')) {
            if (Array.isArray(xmlClass.attributes.attribute)) {
                let attribute = xmlClass.attributes.attribute;
                for (let subAttribute of attribute) {
                    key = '_.attribute.' + subAttribute._attributes.name;
                    Object.assign(attributesJson, getAllSubJson(attributesJson, key, subAttribute));
                }
            } else {
                let subAttribute = xmlClass.attributes.attribute;
                key = '_.attribute.' + subAttribute._attributes.name;
                Object.assign(attributesJson, getAllSubJson(attributesJson, key, subAttribute));
            }
        }
    }
    return attributesJson;
}

// 獲取events节点的数据
function getEventsJson(xmlClass) {
    let eventsJson = {};
    let key;
    if (xmlClass.hasOwnProperty('events')) {
        if (xmlClass.events.hasOwnProperty('event')) {
            if (Array.isArray(xmlClass.events.event)) {
                let event = xmlClass.events.event;
                for (let subEvent of event) {
                    key = '_.event.' + subEvent._attributes.name;
                    Object.assign(eventsJson, getAllSubJson(eventsJson, key, subEvent));
                }
            } else {
                let subEvent = xmlClass.events.event;
                key = '_.event.' + subEvent._attributes.name;
                Object.assign(eventsJson, getAllSubJson(eventsJson, key, subEvent));
            }
        }
    }
    return eventsJson;
}

// 统一处理子节点
function getAllSubJson(jsonData, key, subItemJson) {
    if (subItemJson.hasOwnProperty('description')) {
        Object.assign(jsonData, getDescriptionJson(key, subItemJson));
    }
    if (subItemJson.hasOwnProperty('example')) {
        Object.assign(jsonData, getExampleJson(key, subItemJson));
    }
    if (subItemJson.hasOwnProperty('remarks')) {
        Object.assign(jsonData, getRemarksJson(key, subItemJson));
    }
    return jsonData;
}

// 处理获取到的json对象, 生成需要的json对象
function htmlJsonDataProcetor(fileName, xmlToJsonData) {
    let jsonData = {};
    let keyValueJson = {};
    // 根据格式, 解析数据
    if (!xmlToJsonData.hasOwnProperty('html')) {
        console.log(fileName + ' 为空文件');
        return;
    }
    let xmlHtml = xmlToJsonData.html;

    Object.assign(keyValueJson, getElementsJson(xmlHtml));
    Object.assign(keyValueJson, getAttributesJson(xmlHtml));
    Object.assign(keyValueJson, getEventsJson(xmlHtml));

    let sortjson = jsonSortFromKey(keyValueJson);
    if (objIsEmpty(sortjson)){
        return ;
    }
    jsonData['defs/html/' + fileName] = sortjson;
    return jsonData;
}

// 传入文件目录, 生成json文件
function htmlToJsonFromFolder(folderPath) {
    if (!folderIsExist(folderPath)){
        return ;
    }
    let fileNameList = getSubFilePath(folderPath);
    // console.log(fileNameList);
    // return;
    let jsonData = {};
    for (let filePath of fileNameList) {
        let xmlToJsonData = getJsonFromXml(filePath);
        let fileName = basename(filePath, '.xml');
        if (objIsEmpty(xmlToJsonData)) {
            console.log(filePath + ' 非xml文件或文件出错');
            continue;
        }
        Object.assign(jsonData, htmlJsonDataProcetor(fileName, xmlToJsonData));
    }
    let jsonPath = resolve() + '\\new\\htmlAllJson.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}

// 传入文件目录, 获取json数据
function getHtmlToJsonFromFolderData(folderPath) {
    if (!folderIsExist(folderPath)){
        return ;
    }
    let fileNameList = getSubFilePath(folderPath);
    // console.log(fileNameList);
    // return;
    let jsonData = {};
    for (let filePath of fileNameList) {
        let xmlToJsonData = getJsonFromXml(filePath);
        let fileName = basename(filePath, '.xml');
        if (objIsEmpty(xmlToJsonData)) {
            console.log(filePath + ' 非xml文件或文件出错');
            continue;
        }
        Object.assign(jsonData, htmlJsonDataProcetor(fileName, xmlToJsonData));
    }

    let sortJsonData = jsonSortFromKey(jsonData);
    return sortJsonData;
}


// 传入文件路径, 生成json文件
function htmlToJsonFromFile(filePath) {
    if (!fileIsExist(filePath)){
        return ;
    }
    // 解析xml文件, 获取json对象
    let xmlToJsonData = {};
    xmlToJsonData = getJsonFromXml(filePath);
    // console.log(resolve())
    // return;
    // 根据策略, 解析json对象, 生成需要的json对象
    let fileName = basename(filePath, '.xml');
    // console.log(fileName);
    // return;
    if (objIsEmpty(xmlToJsonData)) {
        console.log(filePath + ' 非xml文件或文件出错');
        return;
    }

    let jsonData = htmlJsonDataProcetor(fileName, xmlToJsonData);
    // 生成json文件
    let jsonPath = resolve() + '\\new\\' + fileName + '.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}

export {
    getHtmlToJsonFromFolderData,
    htmlToJsonFromFile
};
