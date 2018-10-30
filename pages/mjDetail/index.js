// pages/export/expert.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    cauthorid:'',
    currentNav:'0',
    currentStatue:'1',
    planList:[],
    currentNavData:{},
    weekData:{},
    monthData:{},
    buytime:0,
  },
  getuserInfo (author) {
    let url = app.globalData.url.zjListDetail;
    let self = this
    let currentStatues = self.data.currentStatue
    wx.request({
        url:url,
        data:{
          'author':author,
          'type':currentStatues
        },
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    let weekData = {
                        'profit':datas.profit7,
                        'lznum':datas.lznum,
                        'allnum':datas.allnumWeek,
                        'hitnum':datas.hitnumWeek,
                        'dh':datas.dh_7
                    }
                    let monthData = {
                        'profit':datas.profit30,
                        'lznum':datas.lznum,
                        'allnum':datas.allnumMonth,
                        'hitnum':datas.hitnumMonth,
                        'dh':datas.dh_30
                    }
                    let userInfo = {
                      'imgUrl':datas.authheadImlUrl,
                      'name':datas.authName,
                      'authTag':datas.authTag,
                      'mess':datas.authdescription
                    }
                    self.setData({
                        monthData:monthData,
                        weekData:weekData,
                        userInfo:userInfo,
                        currentNavData:weekData,
                        cauthorid:author,
                        planList:datas.explanlists
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
  getDataList (currentStatue) {
    let url = app.globalData.url.zjListDetail;
    let self = this
    let author = self.data.cauthorid
    wx.request({
        url:url,
        data:{
          'author':author,
          'type':currentStatue
        },
        method:"GET",
        success (res) {
            let code = res.statusCode
            if (code == '200') {
                let data = res.data
                if (data.status == '_0000') {
                    let datas = data.data
                    self.setData({
                        planList:datas.explanlists,
                        currentStatue:currentStatue
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
  handleChangFristNav(event){
    let idx = event.currentTarget.dataset.idx;
    let self = this
    if (idx == 0) {
      self.setData({
        currentNav:idx,
        currentNavData:self.data.weekData
      })
    }else{
      self.setData({
        currentNav:idx,
        currentNavData:self.data.monthData
      })
    }
  },
  handleChangSecondNav(event){
     let currentStatue = event.currentTarget.dataset.type
     this.getDataList(currentStatue)
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cauthorid = options.cauthorid
    let self = this
    this.getuserInfo(cauthorid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})