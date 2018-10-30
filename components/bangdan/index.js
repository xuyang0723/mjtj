var app = getApp();
Component({
    behaviors: [],
    options: {
        multipleSlots: true
    },
    properties: {
        _type: String,
        _item: Object,
        _index:Number
    },
    data: {
        attentionState:0
    },
    methods: {
        handleAttention: function (e) {
            let attentionState = this.data.attentionState;
            if (attentionState == 1) {
                wx.showToast({
                    title:'您已经关注过了',
                    icon:'none'
                });
            }else{
                wx.showToast({
                    title:'关注成功',
                    icon:'success'
                });
                this.setData({
                  attentionState:1
                })
            }
            
        }
    },
    attached: function() {
        this.setData({
          attentionState:this.data._item.fans
        })
     },

});