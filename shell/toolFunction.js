import {
    xml2json
} from 'xml-js';

import {
    readFileSync,
    writeFileSync,
    accessSync,
    constants,
    unlinkSync,
    readdirSync,
    lstatSync,
    mkdirSync
} from 'fs';


// 判断文件是否存在
function fileIsExist(filePath) {
    // console.log(filePath);
    // return;
    let flag = false;
    try {
        accessSync(filePath, constants.F_OK);
        var stat = lstatSync(filePath);
        if (stat.isFile()) {
            flag = true;
        }
        // console.log('文件存在');
    } catch (err) {
        console.error('文件不存在, err: ' + err);
    }
    return flag;
}


// 判断文件夹是否存在
function folderIsExist(folderPath) {
    // console.log(folderPath);
    // return;
    let flag = false;
    try {
        accessSync(folderPath, constants.F_OK);
        var stat = lstatSync(folderPath);
        if (stat.isDirectory()) {
            flag = true;
        }
        // console.log('文件夹存在');
    } catch (err) {
        console.error('文件夹不存在, err: ' + err);
    }
    return flag;
}

// 创建文件夹, 若文件夹已存在, 则不创建
function createFolder(folderPath) {
    if (!folderIsExist(folderPath)) {
        mkdirSync(folderPath);
    }
}

// 创建文件, 若文件已存在, 则会覆盖
function createFile(filePath, jsonData) {
    if (fileIsExist(filePath)) {
        // 存在文件, 进行删除
        unlinkSync(filePath, (err) => {
            // console.log('删除文件失败');
            // throw 抛出异常(程序停止运行)
            if (err) throw err;
        });
        // console.log('文件删除成功');
    } else {
        //不做处理
    }
    let str = JSON.stringify(jsonData, "", "\t");
    // 生成新的文件
    writeFileSync(filePath, str, {
        'encoding': 'utf8',
        'flag': 'w'
    }, (err) => {
        // console.log('创建文件失败');
        if (err) throw err;
    });
    console.log('文件已生成, 路径: ' + filePath);
}

// 获取某个文件夹下的所有文件夹的名称
function getSubPathName(folderPath) {
    let subPathList = [];
    let subPathNameList = readdirSync(folderPath);
    for (let list of subPathNameList) {
        if (!fileIsExist(folderPath + '/' + list)) {
            subPathList.push(list);
        }
    }
    return subPathList;
}

// 获取某个文件夹下的所有文件的名称
function getSubFileName(folderPath) {
    let fileNameList = [];
    let subPathNameList = readdirSync(folderPath);
    for (let list of subPathNameList) {
        if (fileIsExist(folderPath + '/' + list)) {
            fileNameList.push(list);
        }
    }
    return fileNameList;
}

// 获取某个文件夹下的所有文件的路径
function getSubFilePath(folderPath) {
    let filePathList = [];
    let subPathNameList = readdirSync(folderPath);
    for (let list of subPathNameList) {
        if (fileIsExist(folderPath + '/' + list)) {
            filePathList.push(folderPath + '/' + list);
        }
    }
    return filePathList;
}

// 判断obj是不是为空
function objIsEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
}

// 获取某个节点下的全部key
function getALLKey(obj) {
    if (Array.isArray(obj)) {
        for (let arr of obj) {
            console.log(Object.keys(arr));
        }
    } else {
        console.log(Object.keys(obj));
    }
}

// 获取某个节点下的全部value
function getValue(obj, name) {
    if (Array.isArray(obj)) {
        for (let arr of obj) {
            console.log(Object.values(arr[name]));
        }
    } else {
        console.log(Object.values(obj[name]));
    }
}

// json按key排序
function jsonSortFromKey(obj) {
    let afterObj = {}
    Object.keys(obj).sort().map(item => {
        afterObj[item] = obj[item]
    })
    return afterObj;
}

// 读取xml文件, 解析xml文件, 生成json对象
function getJsonFromXml(xmlFilePath) {
    // 读取xml文件, 并解析xml文件
    let xml = readFileSync(xmlFilePath, {
        'encoding': 'utf8'
    });
    let xmlDataToJson = {};
    let errJson = {};
    try {
        // 将xml的所有属性, 转换为JSON文件格式, 处理JSON对象, 相当于处理xml文件内容
        xmlDataToJson = JSON.parse(xml2json(xml, {
            compact: true,
            spaces: 4
        }));
    } catch (err) {
        // console.log('非xml文件');
        return errJson;
    }
    // console.log(JSON.stringify(xmlDataToJson));
    // return;
    return xmlDataToJson;
}

export {
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
}