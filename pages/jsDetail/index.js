// pages/export/expert.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    planNo: '',
    currentNav: '0',
    currentStatue: '1',
    planList: [],
    currentNavData: {},
    weekData: {},
    monthData: {},
    buytime: 1,
  },
  getuserInfo(planNo) {
    let url = app.globalData.url.detail;
    let self = this
    wx.request({
      url: url,
      data: {
        'planNo': planNo,
        'cfrom': '159cai'
      },
      method: "GET",
      success(res) {
        let code = res.statusCode
        if (code == '200') {
          let data = res.data
          if (data.status == '_0000') {
            let datas = data.data
            let userInfo = {
              'imgUrl': datas.authheadImlUrl,
              'name': datas.authName,
              'authTag': datas.authTag,
              'mess': datas.authdescription
            }
            self.setData({
              userInfo: userInfo,
              planNo: planNo,
              planList: datas.explanlists
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
  handleChangFristNav(event) {
    let idx = event.currentTarget.dataset.idx;
    let self = this
    if (idx == 0) {
      self.setData({
        currentNav: idx,
        currentNavData: self.data.weekData
      })
    } else {
      self.setData({
        currentNav: idx,
        currentNavData: self.data.monthData
      })
    }
  },
  handleChangSecondNav(event) {
    let currentStatue = event.currentTarget.dataset.type
    this.getDataList(currentStatue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let planNo = options.planNo || 20181018289448
    this.getuserInfo(planNo);
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