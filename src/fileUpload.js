// 引用公共js
import getToken from './utils/getToken.js';
import fileCheck from './utils/fileCheck.js';
import fileToFormData from './utils/fileToFormData.js';
import fileToDataUrl from './utils/fileToDataUrl.js';
import compress from './utils/compress.js';
import dataUrlToBlob from './utils/dataUrlToBlob.js';
import randomFileName from './utils/randomFileName.js';

// 应用appid
let appid = 'xxx';
// params参数
let tokenParams = {};
// tokenParams = getToken();

async function uploadFile(file, fileOptions) {
  // 存储全局相关信息
  appid = fileOptions.appid;
  // 获取文件流+校验
  if (!fileCheck(file, fileOptions)) {
    return false;
  }
  //获取参数
  tokenParams = await getToken(fileOptions.tokenUrl);
  // 数据处理
  let formData = {};
  let fileName = '';
  if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    formData = fileToFormData(file, appid, tokenParams);
  } else if (fileOptions.compress) {
    let res = await fileToDataUrl(file, fileOptions.compressMinSize);
    let compressedDataUrl = await compress(
      res.dataUrl,
      res.shouldCompress,
      file.type || 'image/jpeg'
    );
    let blob = dataUrlToBlob(compressedDataUrl, file.type || 'image/jpeg');
    // blob 转file
    let fileOfBlob = new File([blob], file.name);
    fileName = randomFileName(15, fileOfBlob.name);
    formData = fileToFormData(fileOfBlob, fileName, appid, tokenParams);
  } else {
    fileName = randomFileName(15, file.name);
    formData = fileToFormData(file, fileName, appid, tokenParams);
  }

  const xhr = new XMLHttpRequest();
  // 监听开始事件
  xhr.onloadstart = fileOptions.onUploadStart;
  // 进度监听
  xhr.onprogress = fileOptions.onProgress;
  // 错误监听
  xhr.onerror = fileOptions.onUploadError;
  // 监听请求成功事件
  xhr.onload = function() {
    // console.log('onload');
  };
  // 监听请求延迟未完成
  xhr.ontimeout = function() {
    alert('请求超时请重试！');
  };
  // 监听属性 xhr.readyState1 2 3 4
  xhr.onreadystatechange = function() {
    // 4整个请求过程完毕.
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        fileOptions.onUploadSuccess(
          `${tokenParams.zqyl_host}/${tokenParams.zqyl_key}${fileName}`
        );
      } else {
        // 上传失败
        fileOptions.onUploadError(`${xhr.status}`);
      }
    } else {
      if (xhr.status === 203) {
        let result = JSON.parse(xhr.responseText);
        // alert(result);
      }
    }
  };

  xhr.open('POST', tokenParams.zqyl_host, true);
  xhr.send(formData);
}

// amd方式
// export default {
//   uploadFile
// };

// 全局方式
window.zqyl_fileH5Upload = {
  uploadFile: uploadFile
};
