
//获取应用实例  
var app = getApp();
Page({
  data: {
     list: null,
  },
  goToBlock: function (e) {
    console.log(e);
    app.globalData.spaceId = e.currentTarget.dataset.id
    app.globalData.spaceName = e.currentTarget.dataset.space_name
    wx.navigateTo({
      url: '../fileDetail/fileDetail'
    })

  },
  onLoad: function () {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('t_space_block').get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res)
          var _spaceBlock = new Array();
          for (var i = 0; i < res.data.length; i++) {
            _spaceBlock.push(res.data[i])
            console.log(JSON.stringify(res.data[i]))
          }
          this.setData({
            spaceBlock: _spaceBlock
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }

})