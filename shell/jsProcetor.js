// 此js文件供nodejs使用
// 功能: 传入js相关的xml文件, 根据xml文件生成json文件


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

// 获取parameters节点的数据
function getParametersJson(parent, parObj) {
    let jsonData = {};
    if (parObj.hasOwnProperty('parameters')) {
        if (parObj.parameters.hasOwnProperty('parameter')) {
            let parameter = parObj.parameters.parameter;
            if (Array.isArray(parameter)) {
                for (let subParameter of parameter) {
                    if (subParameter.hasOwnProperty('description')) {
                        let key = parent + '.parameter.' + subParameter._attributes.name + '.description';
                        Object.assign(jsonData, getDescriptionJson(key, subParameter));
                    } else {
                        // 不存在, 不处理
                        // console.log(parent + "此处没有description");
                    }
                }
            } else {
                let subParameter = parameter;
                if (subParameter.hasOwnProperty('description')) {
                    let key = parent + '.parameter.' + subParameter._attributes.name + '.description';
                    Object.assign(jsonData, getDescriptionJson(key, subParameter));
                } else {
                    // 不存在, 不处理
                    // console.log(parent + "此处没有description");
                }
            }
        }
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

// 获取constructors节点的Json数据
function getConstructorsJson(xmlClass) {
    let constructorsJson = {};
    let key = xmlClass._attributes.type + '_.constructor';
    if (xmlClass.hasOwnProperty('constructors')) {
        if (xmlClass.constructors.hasOwnProperty('constructor')) {
            let constructor = xmlClass.constructors.constructor[1]
            // 注意, 解析出来的constructor都是数组类型, 且项首为null
            // 可能后续会出现非数组类型的, 非数组类型的请注意适配
            // console.log(constructor);
            if (constructor.hasOwnProperty('description')) {
                Object.assign(constructorsJson, getDescriptionJson(key, constructor));
            }
            if (constructor.hasOwnProperty('parameters')) {
                Object.assign(constructorsJson, getParametersJson(key, constructor));
            }
        }
    }
    return constructorsJson;
}

// 获取methods节点的数据
function getMethodsJson(xmlClass) {
    let methodsJson = {};
    let key;
    if (xmlClass.hasOwnProperty('methods')) {
        if (xmlClass.methods.hasOwnProperty('method')) {
            if (Array.isArray(xmlClass.methods.method)) {
                let method = xmlClass.methods.method;
                for (let subMethod of method) {
                    key = xmlClass._attributes.type + '_.method.' + subMethod._attributes.name;
                    Object.assign(methodsJson, getAllSubJson(methodsJson, key, subMethod));
                }
            } else {
                let subMethod = xmlClass.methods.method;
                key = xmlClass._attributes.type + '_.method.' + subMethod._attributes.name;
                Object.assign(methodsJson, getAllSubJson(methodsJson, key, subMethod));
            }
        }
    }
    return methodsJson;
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
                    key = xmlClass._attributes.type + '_.property.' + subProperty._attributes.name;
                    Object.assign(propertiesJson, getAllSubJson(propertiesJson, key, subProperty));
                }
            } else {
                let subProperty = xmlClass.properties.property;
                key = xmlClass._attributes.type + '_.property.' + subProperty._attributes.name;
                Object.assign(propertiesJson, getAllSubJson(propertiesJson, key, subProperty));
            }
        }
    }
    return propertiesJson;
}

// 统一处理子节点
function getAllSubJson(jsonData, key, subItemJson) {
    if (subItemJson.hasOwnProperty('description')) {
        Object.assign(jsonData, getDescriptionJson(key, subItemJson));
    }
    if (subItemJson.hasOwnProperty('parameters')) {
        Object.assign(jsonData, getParametersJson(key, subItemJson));
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
function jsJsonDataProcetor(fileName, xmlToJsonData) {
    let jsonData = {};
    let keyValueJson = {};
    // 根据格式, 解析数据
    if (!xmlToJsonData.hasOwnProperty('javascript')) {
        console.log(fileName + ' 为空文件');
        return;
    }
    if (!xmlToJsonData.javascript.hasOwnProperty('class')) {
        console.log(fileName + ' 为空文件');
        return;
    }

    let xmlAllClass = xmlToJsonData.javascript.class;
    for (let xmlClass of xmlAllClass.values()) {
        Object.assign(keyValueJson, getConstructorsJson(xmlClass));
        Object.assign(keyValueJson, getDescriptionJson(xmlClass._attributes.type + '_', xmlClass));
        Object.assign(keyValueJson, getExampleJson(xmlClass._attributes.type + '_', xmlClass));
        Object.assign(keyValueJson, getMethodsJson(xmlClass));
        Object.assign(keyValueJson, getPropertiesJson(xmlClass));
        Object.assign(keyValueJson, getRemarksJson(xmlClass._attributes.type + '_', xmlClass));
    }
    let sortjson = jsonSortFromKey(keyValueJson);
    if (objIsEmpty(sortjson)){
        return ;
    }
    jsonData['defs/js/' + fileName] = sortjson;
    return jsonData;
}

// 传入文件目录, 生成json文件
function jsToJsonFromFolder(folderPath) {
    if (!folderIsExist(folderPath)) {
        return;
    }
    let fileNameList = getSubFilePath(folderPath);
    let jsonData = {};
    for (let filePath of fileNameList) {
        let xmlToJsonData = getJsonFromXml(filePath);
        let fileName = basename(filePath, '.xml');
        if (objIsEmpty(xmlToJsonData)) {
            console.log(filePath + ' 非xml文件或文件出错');
            continue;
        }
        Object.assign(jsonData, jsJsonDataProcetor(fileName, xmlToJsonData));
    }
    let jsonPath = resolve() + '\\new\\jsAllJson.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}

// 传入文件目录, 获取json数据
function getJsToJsonFromFolderData(folderPath) {
    if (!folderIsExist(folderPath)) {
        return;
    }
    let fileNameList = getSubFilePath(folderPath);
    let jsonData = {};
    for (let filePath of fileNameList) {
        let xmlToJsonData = getJsonFromXml(filePath);
        let fileName = basename(filePath, '.xml');
        if (objIsEmpty(xmlToJsonData)) {
            console.log(filePath + ' 非xml文件或文件出错');
            continue;
        }
        Object.assign(jsonData, jsJsonDataProcetor(fileName, xmlToJsonData));
    }
    let sortJsonData = jsonSortFromKey(jsonData);
    return sortJsonData;
}

// 传入文件路径, 生成json文件
function jsToJsonFromFile(filePath) {
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
    let jsonData = jsJsonDataProcetor(fileName, xmlToJsonData);
    // 生成json文件
    let jsonPath = resolve() + '\\new\\' + fileName + '.json';
    let sortJsonData = jsonSortFromKey(jsonData);
    createFolder(resolve() + '\\new');
    createFile(jsonPath, sortJsonData);
}
export {
    getJsToJsonFromFolderData,
    jsToJsonFromFile
};
