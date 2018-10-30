//app.js


import {baseUrl,baseImg} from "./utils/config";
var util = require("./utils/util.js");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: baseUrl,
    baseImg: baseImg,
    cfrom:'159cai',
    version:'1',
    url: {
       'bsList': baseUrl+'/getPageLists.php?fid=jczqProjs', //比赛列表
       'zjList': baseUrl + '/getPageLists.php?fid=authLists', //热门专家
       'zjListDetail':baseUrl+'/getFamousExplainList.php', //专家详情
       'rmList': baseUrl + '/getHomePageJS.php',  //热门解说

       'myPlanList': baseUrl +'/readFamousRecord.php', //我的方案

       'hitExpert': baseUrl +'/getPageLists.php?fid=authhitLists&pagesize=60', //命中榜
       'lznumExpert': baseUrl +'/getPageLists.php?fid=authlzLists&pagesize=60', //连红榜
       'allExpert': baseUrl +'/getPageLists.php?fid=all&pagesize=60',  //全部
       'AttentionExpert': baseUrl + '/getPageLists.php?fid=&pagesize=60',  //关注

       'bsListDetail': baseUrl + '/getProjByItmes.php', //比赛列表详情
       'detail':baseUrl + '/getFamousExplainBydbno.php',  //详情
       'getH5PayInfo':baseUrl + '/getH5PayInfo.php',

       'loginyzm':baseUrl +'/phoneRegisterYZM.php', //短信验证
       'findpassword':baseUrl +'/phoneFindBackPwdYZM.php',//找回密码
       'chklogin':baseUrl + '/checkLg.php', //验证是否登录
    }
  }
})