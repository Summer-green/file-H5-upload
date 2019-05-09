// 校验
function fileCheck(file, fileOptions) {
  // 获取当前选中的文件
  // const file = event.target.files[0];
  const imgMasSize = 1024 * 1024 * fileOptions.fileSizeLimit; // 大小
  // 检查文件类型
  if (fileOptions.fileTypeExts.indexOf(file.type.split('/')[1]) < 0) {
    // 自定义报错方式
    alert('文件类型仅支持 jpeg/png/gif！');
    return false;
  }
  // 文件大小限制
  if (file.size > imgMasSize) {
    // 自定义报错方式
    alert(`文件大小不能超过${fileOptions.fileSizeLimit}10MB！`);
    return false;
  }
  return true;
}

export default fileCheck;
