const app = getApp();
import util from '../../util/util';
import request from '../../util/request';
Page({
  data: {
    username: '',
    password: ''
  },

  //监听账号输入
  usernameInput: function (e) {
    this.data.username = e.detail.value;
  },

  //监听密码输入
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },

  //登录按钮点击事件
  loginaction: function () {
    let that = this;
    let username = that.data.username;
    let password = that.data.password;
    console.log('账号：' + this.data.username);
    console.log('密码：' + password);
    console.log('denglu');
    if (username == '') {
      util.showToast({
        title: '账号不能为空',
        icon: '',
        image: '../images/info-sign.png',
        success: () => {
          console.log('用户名不能为空')
        }
      });
      return;
    }
    if (password == '') {
      util.showToast({
        title: '密码不能为空',
        icon: '',
        image: '../images/info-sign.png',
        success: () => {
          console.log('密码不能为空')
        }
      });
      return;
    }
    // if(username != 'admin' || password != '123') {
    //   util.showToast({
    //     title: '账号或密码错误',
    //     icon: '',
    //     image: '../../images/info-sign.png',
    //     success: ( ) => { console.log('账号或密码错误') }
    //   });
    //   return;
    // }

    //loading
    util.showLoading('登录中...');

    //mock测试数据
    // let url = 'http://localhost:8080/WebDemo10/AjaxmlServlet';
    // let obj = {
    //   username: username,
    //   password: password
    // }
    wx.request({
      url: 'http://localhost:8080/WxSigin/loginServlet',
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.message == "ok") {
          console.log('登录成功');
          app.globalData.username=username;
          //登录成功则跳转到地图页
          wx.setStorage({
            key: "loginStatus",
            data: 1,
            key: "username",
            data: username
          })
          app.globalData.loginStatus = 1;
          console.log(app.globalData.loginStatus)
          // wx.redirectTo({
          //   url: '/pages/person/person'
          // })
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/person/person'
            })
          }, 500)


          // wx.reLaunch({ url: '/pages/index/index' });
          // wx.redirectTo({ url: '/pages/index/index' });
          //关闭loading
          util.hideLoading();
        } else {
          util.showToast({
            title: '账号或者密码错误,请稍后重试',
            icon: '',
            image: '../images/info-sign.png',
            success: () => {
              console.log('账号或者密码错误')
            }
          }, 500);
        }


      }
    })
    // request.getRequest(url, obj)
    //   .then(res => {
    //     console.log('mock数据', res)
    //     let code = res.statusCode;
    //     if (code == 200) {
    //       console.log('登录成功');
    //       wx.setStorageSync('username', username);
    //       //登录成功则跳转到地图页
    //       wx.setStorage({
    //         key: "loginStatus",
    //         data: 1,
    //         key: "username",
    //         data: username
    //       })
    //       app.globalData.loginStatus = 1;
    //       console.log(app.globalData.loginStatus)
    //       // wx.redirectTo({
    //       //   url: '/pages/person/person'
    //       // })
    //       setTimeout(() => {
    //         wx.reLaunch({
    //           url: '/pages/person/person'
    //         })
    //       }, 500)


    //       // wx.reLaunch({ url: '/pages/index/index' });
    //       // wx.redirectTo({ url: '/pages/index/index' });
    //       //关闭loading
    //       util.hideLoading();
    //     } else {
    //       util.showToast({
    //         title: '请稍后重试',
    //         icon: '',
    //         image: '../images/info-sign.png',
    //         success: () => {
    //           console.log('登录失败，稍后重试')
    //         }
    //       });
    //     }
    //   })
    // .catch(res => {
    //   util.showToast({
    //     title: '请稍后重试',
    //     icon: '',
    //     image: '../images/info-sign.png',
    //     success: () => {
    //       console.log('登录失败，稍后重试')
    //     }
    //   });
    // })

  },




})