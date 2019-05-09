// 将File append进 FormData
function transformFileToFormData(file, fileName, appid, tokenParams) {
  // 文件名随机 无中文
  const formData = new FormData();
  // 自定义formData中的内容
  formData.append('name', appid, fileName);
  // formData.append('key', tokenParams.zqyl_key + '${filename}');
  formData.append('key', tokenParams.zqyl_key + fileName);
  formData.append('policy', tokenParams.zqyl_policyBase64);
  formData.append('OSSAccessKeyId', tokenParams.zqyl_accessid);
  formData.append('success_action_status', 200);
  formData.append('callback', tokenParams.zqyl_callbackbody);
  formData.append('signature', tokenParams.zqyl_signature);
  formData.append(
    'x:url',
    `${tokenParams.zqyl_host}/${tokenParams.zqyl_key}${fileName}`
  );
  formData.append('x:appid', appid);
  // append 文件
  formData.append('file', file);
  return formData;
}

export default transformFileToFormData;
