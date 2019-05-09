// 将file将文件转换成base64格式的dataUrl
function fileToDataUrl(file, compressMinSize) {
  const imgCompassMaxSize = compressMinSize * 1024 * 1024; // 超过 1000k 就压缩

  // 封装好的函数
  const reader = new FileReader();

  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    // 读取完成后触发 file转dataUrl是个异步函数，代码写在回调里
    reader.onload = function(e) {
      const result = e.target.result; // data: URL格式的字符串以表示所读取文件的内容 result可预览
      if (result.length < imgCompassMaxSize) {
        resolve({ dataUrl: result, shouldCompress: false });
      } else {
        resolve({ dataUrl: result, shouldCompress: true });
      }
    };
  });
}

export default fileToDataUrl;
