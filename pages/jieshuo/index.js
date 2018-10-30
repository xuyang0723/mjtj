//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  	playtype: 0, // 0全部 1竞足 2竞蓝 3胜负彩 4任选9
	type: 0, //比赛状态 0全部
	name: '', // rq人气 profit命中 dh带红
	page: 1,
	pagesize: 20,
	planList:[],
	allList:false,
	animationData:{}
  },
  getListInfo(arr,playtype,name,page,allList){
    let playtypes = playtype ? playtype : this.data.playtype
    let types = this.data.type
    let names = name === undefined ? this.data.name : name
    let pages = page ? page : this.data.page
    let pagesizes = this.data.pagesize
    let allLists = allList  ?allList:this.data.allList
    let url = app.globalData.url.rmList;
    let arrs = arr ? arr :this.data.planList
    let self = this
    wx.request({
      url: url,
      data:{
		playtype: playtypes,
		type: types,
		name: names,
		page: pages,
		pagesize: pagesizes,
      },
      method: "GET",
      success(res) {
        let code = res.statusCode
        if (code == '200') {
          let data = res.data
          if (data.status == '_0000') {
            let datas = data.data
            if ( datas.length < 20) {
            	allList = true
            }
            let list = arrs.concat(datas)
            self.setData({
	            planList: list,
	            playtype: playtypes,
				type: types,
				name: names,
				page: pages,
				allList:allLists,
				pagesize: pagesizes,
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
  handlChangePlaytype (event) {
    wx.pageScrollTo({scrollTop:0,duration:10})
  	let playtype = event.currentTarget.dataset.playtype
  	let name = this.data.name
  	let page = 1
  	let allList = false
  	this.getListInfo([],playtype,name,page,allList)
  },
  handlChangeName (event) {
  	wx.pageScrollTo({scrollTop:0,duration:10})
  	let playtype = this.data.playtype
  	let name = event.currentTarget.dataset.name
  	let page = 1
  	let allList = false

  	this.getListInfo([],playtype,name,page,allList)
  },
  onLoad () {
  	this.getListInfo()
  },
  onReachBottom (){
  	let page = this.data.page;
  	let allList = this.data.allList;
  	let playtype = this.data.playtype
  	let name = this.data.name
  	let arr = this.data.planList
  	if (allList) {
  		wx.showToast({title:'已加载全部',icon:'none'})
  	}else{
  		page++
  		this.getListInfo(arr,name,page,allList)
  	}
  }
})
