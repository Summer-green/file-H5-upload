function random_name(len, filename) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd + get_suffix(filename);
}

function get_suffix(filename) {
  var zqyl_pos = filename.lastIndexOf('.');
  var suffix1 = '';
  if (zqyl_pos != -1) {
    suffix1 = filename.substring(zqyl_pos);
  }
  return suffix1;
}

export default random_name;
