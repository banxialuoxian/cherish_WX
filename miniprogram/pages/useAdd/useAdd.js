const app = getApp()
//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false, //是否显示弹出框
    storageName:'', //物品名称
    space_id: 'XCzPjpT75u228j68', //规格ID
    space_id_now: 'XCzPjpT75u228j68', //默认规格ID
    space_name: '主卧', //规格文本
    photo_path:'',//图片地址
    count:1,
    addSpaceStatus: false, //是否显示增加存储地
    inputsStorageName:'',

  },
  filter: function(e) {
    var self = this,
      e_id = e.currentTarget.dataset.id,
      e_space_name = e.currentTarget.dataset.space_name
    self.setData({
      space_id_now: e_id,
      space_id_now: e_id,
      space_name_now: e_space_name
    });
  },

  /*选择标签 */
  labelSelect: function (e) {
    console.log(e);
    var self = this,
      e_label_id = e.currentTarget.dataset.label_id,
      e_label_name = e.currentTarget.dataset.label_name
    self.setData({
      label_id: e_label_id,
      label_name: e_label_name
    });
  },

  /*增加存储地 */
  addStoragePlace: function(e) {

    var random = Math.floor(Math.random() * 6);
    const db = wx.cloud.database()
    db.collection('t_space_block').add({
      data: {
        space_name: this.data.inputsStorageName,
        image: random
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1,
          addSpaceStatus: false
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.showStoragePlace();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  //显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //确定隐藏对话框
  hideModalConfirm: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      space_id: this.data.space_id_now,
      space_name: this.data.space_name_now
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)


    var that = this
    var labelJson = require("../storageAdd/label.js")
    console.log(labelJson);
        that.setData({
          labelBlock: labelJson.label,//第一个data为固定用法，第二个data是json中的data

        })
      },
  //取消隐藏对话框
  hideModalCancle: function() {
        // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)

  },
  showStoragePlace: function(e) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('t_space_block').get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        var _spaceBlock = new Array();
        for (var i = 0; i < res.data.length; i++) {
          _spaceBlock.push(res.data[i])
          console.log(JSON.stringify(res.data[i]) + 1)
        }
        this.setData({
          spaceBlock: _spaceBlock,
          showModalStatus: true
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
  storageNameInput: function (e) {
    this.data.storageName = e.detail.value;
    this.setData({
      storageName: this.data.storageName
    })
  },  
  // 上传图片
  doUpload: function () {
    // 选择图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        that.setData({
          imgUrl: filePath
        })
        // 上传图片
        var code;
        //首先默认code为空字符串
        code = '';
        //设置长度，这里看需求，我这里设置了4
        var codeLength = 4;
        //设置随机字符
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //循环codeLength 我设置的4就是循环4次
        for (var i = 0; i < codeLength; i++) {
          //设置随机数范围,这设置为0 ~ 36
          var index = Math.floor(Math.random() * 36);
          //字符串拼接 将每次随机的字符 进行拼接
          code += random[index];
        }
        const cloudPath = that.data.storageName + code + filePath.match(/\.[^.]+?$/)[0]

        console.log(cloudPath)
        wx.cloud.uploadFile({ 
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', cloudPath, res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  changeAddSpaceStatus: function (e) {
    this.setData({
      addSpaceStatus: true
    })
  },
  cancleStoragePlace: function (e) {
    this.setData({
      addSpaceStatus: false
    })
  },
  getInputStoragePlace: function (e) {
    debugger;
    this.data.inputsStorageName = e.detail.value;
    this.setData({
      inputsStorageName: this.data.inputsStorageName
    })
  },
  submit: function (e) {
    const db = wx.cloud.database()
    db.collection('t_file_block').add({
      data: {
        space_id: this.data.space_id,
        file_name: this.data.storageName,
        photo_path: app.globalData.fileID,
        label_name: this.data.label_name,

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        wx.switchTab({
          url: '../index/index'
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        wx.switchTab({
          url: '../index/index'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
})