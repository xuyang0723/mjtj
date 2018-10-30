//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");

Page({
  data: {
    sportList:[],
    expertList:[],
    planList:[],
    currentPlanType:'',
    currentPlanListNav:0,
    PlanListNav: [
        {
            "type": "人气",
            'name':''
        },
        {
            "type": "命中率",
            'name':'profit'
        },
        {
            "type": "带红人数",
            'name':'dh'
        }
    ]
  },
  getSportList () {
    let url = app.globalData.url.bsList;
    let self = this
    wx.request({
        url:url,
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    self.setData({
                        sportList:datas
                    })
                }
            }else{
                console.log(res.errMsg)
            }
        },
        fail (res) {
            console.log(res.statusCode)
        }
    })
  },
  getExpertList () {
    let url = app.globalData.url.zjList;
    let self = this
    wx.request({
        url:url,
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    let newdata =  datas.slice(0,3)
                    self.setData({
                        expertList:newdata
                    })
                }
            }else{
                console.log(res.errMsg)
            }
        },
        fail (res) {
            console.log(res.statusCode)
        }
    })
  },
  getPlanList (event) {
    let url = app.globalData.url.rmList;
    let self = this;
    let name = event ? event.currentTarget.dataset.type : '';
    let idx =event ? event.currentTarget.dataset.index : 0;
    let names = name ? name :self.data.currentPlanType;
    wx.request({
        url:url,
        data:{
            'page': 1,
            'playtype': 1,
            'type': 0,
            'name':names ,
            'pagesize': 20
        },
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    self.setData({
                        planList:datas,
                        currentPlanType:names,
                        currentPlanListNav:idx
                    })
                }
            }else{
                console.log(res.errMsg)
            }
        },
        fail (res) {
            console.log(res.statusCode)
        }
    })
  },
   handlToUrl () {
    // util.chklogin(function() {
    //    wx.navigateTo({url:'../myPlan/index'})
    // },function(){
    //     wx.navigateTo({url:'../loginPhone/index'})
    // });
    wx.navigateTo({url:'../myPlan/index'})
  },
  onLoad () {
    this.getSportList()
    this.getExpertList()
    this.getPlanList()
  }
})