// 此js文件供nodejs使用
// 功能: 传入css相关的xml文件, 根据css文件生成json文件

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

// 获取hint的数据
function getHintJson(parent, exaObj) {
    let jsonData = {};
    let key = parent + '.hint';
    let value;
    if (exaObj.hasOwnProperty('hint')) {
        let hint = exaObj.hint;
        if (hint.hasOwnProperty('_text')) {
            value = hint._text;
        } else if (hint.hasOwnProperty('_cdata')) {
            value = hint._cdata;
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

// 獲取properties节点的数据
function getPropertiesJson(xmlClass) {
    let propertiesJson = {};
    let key;
    if (xmlClass.hasOwnProperty('properties')) {
        if (xmlClass.properties.hasOwnProperty('property')) {
            if (Array.isArray(xmlClass.properties.property)) {
                let property = xmlClass.properties.property;
                for (let subProperty of property) {
                    key = '_.property.' + subProperty._attributes.name;
                    Object.assign(propertiesJson, getAllSubJson(propertiesJson, key, subProperty));
                }
            } else {
                let subProperty = xmlClass.properties.property;
                key = '_.property.' + subProperty._attributes.name;
                Object.assign(propertiesJson, getAllSubJson(propertiesJson, key, subProperty));
            }
        }
    }
    return propertiesJson;
}

// 獲取pseudo-classes节点的数据
function getPseudoClassesJson(xmlClass) {
    let subPseudoClassesJson = {};
    let key;
    if (xmlClass.hasOwnProperty('pseudo-classes')) {
        if (xmlClass['pseudo-classes'].hasOwnProperty('pseudo-class')) {
            if (Array.isArray(xmlClass['pseudo-classes']['pseudo-class'])) {
                let pseudoClass = xmlClass['pseudo-classes']['pseudo-class'];
                for (let subPseudoClass of pseudoClass) {
                    key = '_.pseudo-class.' + subPseudoClass._attributes.name;
                    Object.assign(subPseudoClassesJson, getAllSubJson(subPseudoClassesJson, key, subPseudoClass));
                }
            } else {
                let subPseudoClass = xmlClass['pseudo-classes']['pseudo-class'];
                key = '_.pseudo-class.' + subPseudoClass._attributes.name;
                Object.assign(subPseudoClassesJson, getAllSubJson(subPseudoClassesJson, key, subPseudoClass));
            }
        }
    }
    return subPseudoClassesJson;
}

// 獲取pseudo-elements节点的数据
function getPseudoElementsJson(xmlClass) {
    let subPseudoElementsJson = {};
    let key;
    if (xmlClass.hasOwnProperty('pseudo-elements')) {
        if (xmlClass['pseudo-elements'].hasOwnProperty('pseudo-element')) {
            if (Array.isArray(xmlClass['pseudo-elements']['pseudo-element'])) {
                let pseudoElement = xmlClass['pseudo-elements']['pseudo-element'];
                for (let subPseudoElement of pseudoElement) {
                    key = '_.pseudo-element.' + subPseudoElement._attributes.name;
                    Object.assign(subPseudoElementsJson, getAllSubJson(subPseudoElementsJson, key, subPseudoElement));
                }
            } else {
                let subPseudoElement = xmlClass['pseudo-elements']['pseudo-element'];
                key = '_.pseudo-element.' + subPseudoElement._attributes.name;
                Object.assign(subPseudoElementsJson, getAllSubJson(subPseudoElementsJson, key, subPseudoElement));
            }
        }
    }
    return subPseudoElementsJson;
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
    if (subItemJson.hasOwnProperty('hint')) {
        Object.assign(jsonData, getHintJson(key, subItemJson));
    }
    return jsonData;
}

// 处理获取到的json对象, 生成需要的json对象
function cssJsonDataProcetor(fileName, xmlToJsonData) {
    let jsonData = {};
    let keyValueJson = {};
    // 根据格式, 解析数据
    if (!xmlToJsonData.hasOwnProperty('css')) {
        console.log(fileName + ' 为空文件');
        return;
    }
    let xmlCss = xmlToJsonData.css;

    Object.assign(keyValueJson, getElementsJson(xmlCss));
    Object.assign(keyValueJson, getPropertiesJson(xmlCss));
    Object.assign(keyValueJson, getPseudoClassesJson(xmlCss));
    Object.assign(keyValueJson, getPseudoElementsJson(xmlCss));

    let sortjson = jsonSortFromKey(keyValueJson);
    if (objIsEmpty(sortjson)){
        return ;
    }
    jsonData['defs/css/' + fileName] = sortjson;
    return jsonData;
}

// 传入文件目录, 生成json文件
function cssToJsonFromFolder(folderPath) {
    if (!folderIsExist(folderPath)) {
        return;
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
        Object.assign(jsonData, cssJsonDataProcetor(fileName, xmlToJsonData));
    }
    let jsonPath = resolve() + '\\new\\cssAllJson.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}

// 传入文件目录, 获取json数据
function getCssToJsonFromFolderData(folderPath) {
    if (!folderIsExist(folderPath)) {
        return;
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
        Object.assign(jsonData, cssJsonDataProcetor(fileName, xmlToJsonData));
    }
    let sortJsonData = jsonSortFromKey(jsonData);
    return sortJsonData;
}

// 传入文件路径, 生成json文件
function cssToJsonFromFile(filePath) {
    if (!fileIsExist(filePath)) {
        return;
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

    let jsonData = cssJsonDataProcetor(fileName, xmlToJsonData);
    // 生成json文件
    let jsonPath = resolve() + '\\new\\' + fileName + '.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}

export {
    getCssToJsonFromFolderData,
    cssToJsonFromFile
};
