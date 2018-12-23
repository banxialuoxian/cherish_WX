//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageSelect : ' ',
      storageInformation_file_id: 1,
      storageInformation_file_name: '',
      storageInformation_photo_path: '',
      storageInformation_description: '',
      storageInformation_created_at: '',
      storageInformation_updated_at: '',
      storageInformation_space_name: '四件套'
  },
  storageInput: function (e) {
    this.setData({
      storageSelect: e.detail.value
    })
  },
  storageShow: function (e) {
    this.setData({
      storageInformation_space_name: e.detail.value
    })
  },
  //根据名称查询存储信息
  seachStorageByName: function (e) {
    var that = this;
    var urlDoamin = getApp().globalData.urlDomain;
        wx.request({
      url: urlDoamin +'/v1/storage/getStorageByName',
      header: {
        'content-type': 'application/json'
      },
      data: { StorageName: this.data.storageSelect },
      method: 'GET',
      success: function (res) {
        console.log(res.data.result.description);
        that.setData({
          storageInformation_space_name: res.data.result.space_name,
        })

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