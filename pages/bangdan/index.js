//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  	currentType:'all',
  	list:[]
  },
  getListInfo(type){
    let types = type ? type : this.data.currentType
    let url = app.globalData.url[types +'Expert'];
    let self = this
    wx.request({
      url: url,
      method: "GET",
      success(res) {
        let code = res.statusCode
        if (code == '200') {
          let data = res.data
          if (data.status == '_0000') {
            let datas = data.data
            self.setData({
              list: datas,
              currentType:types
            })
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
  handlChangeNav (event){
    let type =  event.currentTarget.dataset.type;
    console.log(type)
    this.getListInfo(type)
  },
  onLoad () {
    this.getListInfo()
  },
  onReady () {} 
})
