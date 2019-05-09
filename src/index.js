// import fileUploadObj from '../dist/file-h5-upload.min.js';
import fileUploadObj from './fileUpload.js';
window.onload = function() {
  var dom = document.getElementById('fileUpload');
  dom.onchange = function(event) {
    // 配置
    let fileOptions = {
      tokenUrl: 'http://192.168.3.4:9021/oss/web/getToken',
      appid: 2,
      fileSizeLimit: 100, // 文件大小限制 单位MB
      fileTypeExts: ['jpeg', 'png', 'gif', 'jpg', 'mp4', 'WebM', 'Ogv', 'mp3'],
      compress: false, //是否压缩
      compressMinSize: 1, // 文件大小大于时压缩 单位MB
      onUploadStart: function() {
        // 上传开始时的回调
        console.log('正在上传，请稍后！！');
      },
      onProgress: function(e) {
        // 上传进度回调
        console.log(e.loaded / e.total);
      },
      onUploadSuccess: function(ret) {
        // 上传成功的回调
        alert('上传成功');
        console.log(ret);
      },
      onUploadError: function(err) {
        // 上传失败的回调
        alert('上传失败');
        console.log(err);
      }
    };
    console.log(event.target.files[0]);
    // import引用 调用方法
    // fileUploadObj.uploadFile(event.target.files[0], fileOptions);

    // <script>标签引用 调用方法
    window.zqyl_fileH5Upload.uploadFile(event.target.files[0], fileOptions);
  };
};
