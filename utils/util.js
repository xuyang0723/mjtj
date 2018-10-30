import {baseUrl} from "./config";

const timeType = function (time,type)//time是要转化的时间，type是要转成的格式，如yy:MM:dd hh:mm 
{
    if (!time) { return ''};
    var t = new Date(time);
    var o = {
        "M+": t.getMonth() + 1, //month
        "d+": t.getDate(), //day
        "h+": t.getHours(), //hour
        "m+": t.getMinutes(), //minute
        "s+": t.getSeconds(), //second
        "q+": Math.floor((t.getMonth() + 3) / 3), //quarter
        "S": t.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(type)) {
        type = type.replace(RegExp.$1,(t.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(type)){
            type = type.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return type;
 };
const TextEllipsis = function (txt,len) {
    if (!txt) { return ''};
    var txt = txt.toString();
    if (txt.length>len)
      txt=txt.substring(0,len)+'...';
    return txt;
}
//获取参数
const getQuery = function (key, url) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//检测登录
const chklogin= function (login,nologin) {
    var code ='';
    let url = baseUrl +'/checkLg.php';
    wx.request({
        url: url,
        data:{
            "cfrom": '159cai'
        },
        method: "GET",
        success(res) {
            let code = res.statusCode
            if (code == '200') {
              let data = res.data
              if (data.status == '_0000') {
                login && login()
              }
              if (data.status == '_9999') {
                nologin && nologin()
              }
            } else {
              console.log(res.errMsg)
            }
        },
        fail(res) {
            console.log(res.statusCode)
        }
    });
}
module.exports = {
    timeType,
    TextEllipsis,
    getQuery,
    chklogin
};
