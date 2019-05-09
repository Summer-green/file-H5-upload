function testFunc() {
  console.log('测试');
}

//模块化开发方式 externals配置
export default {
  testFunc
};

//传统的方法没有提供UMD的那些功能，只能从window或者global暴露方法
// window.fileH5Upload = {
//   uploadFile: testFunc
// };
