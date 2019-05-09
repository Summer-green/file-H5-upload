// 使用canvas绘制图片并压缩 重新返回新的dataURL
function compress(dataURL, shouldCompress = true, fileType) {
  const img = new window.Image();
  img.src = dataURL;
  // 异步事件
  return new Promise((resolve, reject) => {
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width; // 压缩最大宽
      canvas.height = img.height; // 压缩最大高

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let compressedDataUrl;

      if (shouldCompress) {
        // 压缩
        // console.log('图片压缩');
        compressedDataUrl = canvas.toDataURL(fileType, 0.8); //压缩质量
      } else {
        // 不压缩
        // console.log('图片不压缩');
        compressedDataUrl = canvas.toDataURL(fileType, 1);
      }
      resolve(compressedDataUrl);
    };
  });
}

export default compress;
