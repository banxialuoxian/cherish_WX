//index.js
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNotEmpty: false, //是否为空
    label_name:''
  },
  storageInput: function (e) {
    this.setData({
      storageSelect: e.detail.value,
      inputNotEmpty:true
    })
  },
  emptyInput: function (e) {
    this.setData({
      storageSelect: '',
      inputNotEmpty: false
    })
  },
  seachStorageByName: function (e) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('t_file_block').where({
      file_name: db.RegExp({
        regexp: this.data.storageSelect,
        options: 'i',
      })
    }).get({
      success: res => {
          console.log('[数据库] [查询记录] 成功: ', res)
        var _fileBlock = new Array();
          for (var i = 0; i < res.data.length; i++) {
            _fileBlock.push(res.data[i])
            console.log(JSON.stringify(res.data[i]) + 1)
          }
          this.setData({
            fileBlock: _fileBlock
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
  },
  goToFind:function (e) {
    var self = this
    if (e.currentTarget.id=="mother"){
      self.setData({
        label_name: "皇后"
      })
    }
    if (e.currentTarget.id == "father") {
      this.setData({
        label_name: "皇上"
      })
    }
    if (e.currentTarget.id == "me") {
      this.setData({
        label_name: "公主"
      })
    }
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('t_file_block').where({
      label_name: db.RegExp({
        regexp: this.data.label_name,
        options: 'i',
      })
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        var _fileBlock = new Array();
        for (var i = 0; i < res.data.length; i++) {
          _fileBlock.push(res.data[i])
          console.log(JSON.stringify(res.data[i]) + 1)
        }
        this.setData({
          fileBlock: _fileBlock
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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