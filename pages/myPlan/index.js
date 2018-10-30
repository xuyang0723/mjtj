//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  	buytime:0,
  	Type:'70',//默认是足球 71是篮球
  	navType:'1',
  	planList:[]
  },
   getListInfo(type,navType){
    let Type = type ? type : this.data.type
    let navTypes = navType ? navType : this.data.navType
    let Page = Page ? Page : this.data.Page
    let url = app.globalData.url.myPlanList;
    let self = this
    wx.request({
      url: url,
      data:{
		type: navType,
		version: 1,
		playtype: Type,
		cfrom: '159cai'
      },
      method: "GET",
      success(res) {
        let code = res.statusCode
        if (code == '200') {
          let data = res.data
          if (data.status == '_0000') {
            let datas = data.data
            self.setData({
              planList: datas,
              Type:Type,
              navType:navTypes
            })
          }else if( data.status == "_0038"){
          	 wx.navigateTo({url:'../loginPhone/index'})
          }
        } else {
          console.log(res.errMsg)
        }
      },
      fail(res) {
        console.log(res.statusCode)
      }
    })
  },
  handleChangType (event) {
  	let type = event.currentTarget.dataset.type
  	let navType =  this.data.navType
  	this.getListInfo(type,navType)
  },
  handlChangeNavType (event) {
  	let type = this.data.Type
  	let navType = event.currentTarget.dataset.type
  	this.getListInfo(type,navType)
  },
  onLoad () {
  	this.getListInfo()
  },
  onReady () {} 
})
