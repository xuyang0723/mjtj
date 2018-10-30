//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");

Page({
  data: {
  	page:1,
  	playtype:'',
  	term:'',
    guestTeamIcon:'',
    homeTeamIcon:'',
    matchname:'',
    matchtime:'',
    mname:'',
    sname:'',
    explans:'',
    allList:false,
  	planList:[],
  	newList:[],
  },
  getInfo(page,playtype,term){
  	let url = app.globalData.url.bsListDetail;
    let self = this;
    wx.request({
        url:url,
        data:{
            'page': page,
            'playtype':playtype,
            'term': term
        },
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    let titleTime = util.timeType(datas.matchtime,"MM/dd hh:mm")
                    let tit = datas.matchname + titleTime
                    let allList = '';
                    wx.setNavigationBarTitle({title:tit})
                    if ( datas.itmes < 20) {
                    	allList = true
                    }
                    self.setData({
                      planList: datas.itmes,
                      guestTeamIcon: datas.guestTeamIcon,
                      homeTeamIcon: datas.homeTeamIcon,
                      matchname: datas.matchname,
                      matchtime: datas.matchtime,
                      mname: datas.mname,
                      sname: datas.sname,
                      explans:datas.explans,
                      allList:allList,
                      playtype:playtype,
  					          term:term
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
  getPlanList (page) {
    let url = app.globalData.url.bsListDetail;
    let self = this;
    let playtype = this.data.playtype
  	let term = this.data.term
    wx.request({
        url:url,
        data:{
            'page': page,
            'playtype':playtype,
            'term': term
        },
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    let allList = '';
                    if ( datas.itmes.length < 20) {
                    	allList = true
                    }
                    let list = self.data.planList.concat(datas.itmes)
                    self.setData({
                      planList:list,
                      page:page,
                      allList:allList
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
  onLoad (ops) {
  	let playType = ops.playType
  	let term = ops.itemid
  	this.getInfo(1,playType,term)
  },
  onReachBottom (){
  	let page = this.data.page;
  	let allList = this.data.allList;
  	if (allList) {
  		wx.showToast({title:'已加载全部',icon:'none'})
  	}else{
  		page++
  		this.getPlanList(page)
  	}
  }
})
