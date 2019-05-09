//dataUrl转成Blob对象
function dataUrlToBlob(dataURL, fileType) {
  // 这里使用二进制方式处理dataUrl
  const binaryString = window.atob(dataURL.split(',')[1]); //base64解密
  const arrayBuffer = new ArrayBuffer(binaryString.length); //类型化数组 放0和1组成的二进制数据 初始化后固定大小
  const intArray = new Uint8Array(arrayBuffer); //一个8位无符号整型数组
  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i); //返回指定位置的字符的 Unicode 编码
  }
  const data = [intArray];
  let blob;
  try {
    blob = new Blob(data, { type: fileType });
  } catch (error) {
    window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (error.name === 'TypeError' && window.BlobBuilder) {
      const builder = new BlobBuilder();
      builder.append(arrayBuffer);
      blob = builder.getBlob(fileType);
    } else {
      throw new Error('版本过低，不支持上传图片');
    }
  }

  return blob;
}

export default dataUrlToBlob;
