var zqyl_expire = 0;
var zqyl_timestamp = '';
var zqyl_now = (zqyl_timestamp = Date.parse(new Date()) / 1000);

function send_request(tokenUrl) {
  let xmlhttp = null;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  if (xmlhttp != null) {
    let zqyl_serverUrl = tokenUrl;
    xmlhttp.open('GET', zqyl_serverUrl, false);
    xmlhttp.send(null);
    return xmlhttp.responseText;
  } else {
    alert('Your browser does not support XMLHTTP.');
  }
}

async function get_signature(tokenUrl) {
  let zqyl_timestamp = '';
  let zqyl_now = (zqyl_timestamp = Date.parse(new Date()) / 1000);
  if (zqyl_expire < zqyl_now + 3) {
    let zqyl_body = await send_request(tokenUrl);
    let obj = eval('(' + zqyl_body + ')');
    let zqyl_host = obj['host'];
    let zqyl_policyBase64 = obj['policy'];
    let zqyl_accessid = obj['accessid'];
    let zqyl_signature = obj['signature'];
    let zqyl_expire = parseInt(obj['expire']);
    let zqyl_callbackbody = obj['callback'];
    let zqyl_key = obj['dir'];
    return {
      zqyl_host,
      zqyl_policyBase64,
      zqyl_accessid,
      zqyl_signature,
      zqyl_expire,
      zqyl_callbackbody,
      zqyl_key
    };
  }
}

export default get_signature;
