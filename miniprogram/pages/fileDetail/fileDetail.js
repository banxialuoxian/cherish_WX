const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: '',
    spaceName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      spaceId,
      spaceName,
    } = app.globalData
    this.setData({
      spaceId,
      spaceName,
    })
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
    db.collection('t_file_block').where({
      space_id: spaceId
    }).get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res)
          var _spaceBlock = new Array();
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].photo_path.length > 1){
              res.data[i].photo_path = res.data[i].photo_path[0]
            }
            _spaceBlock.push(res.data[i])
            console.log(JSON.stringify(res.data[i]) + 1)
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
    wx.setNavigationBarTitle({
      title: spaceName
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})