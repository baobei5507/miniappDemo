// index.js

import {request,http} from "../../request/index.js";
const app = getApp(); 
const WXAPI = require('apifm-wxapi');
WXAPI.init('kekedabaozha')
const { ROUTER } = require("../../router")


const DAILY_REPORT = 'dailyReport';

Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[],
    provinces: ROUTER.PROVINCE,
    myTools: [
      {
        text: '每日备忘录',
        key: DAILY_REPORT,
        index :'',
        link: ROUTER.DAILY_REPORT,
      }
    ]
  },
  onLoad: function(options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList(){
    // request({url:"/home/swiperdata"}).then((res)=>{
    //   this.setData({
    //     swiperList: res
    //   })
    // })
    WXAPI.banners().then(res => app.handleDestruction(res))
      .then((data) => {
        this.setData({
          swiperList: data,
        })
      });
  },
  // 获取分类导航
  getCatesList(){
    request({url:"/home/catitems"}).then((res)=>{
      this.setData({
        catesList: res
      })
    })
    // WXAPI.goodsCategory().then(res => app.handleDestruction(res))
    //   .then((data) => {
    //     this.setData({
    //       catesList: data,
    //     })
    //   });
  },
  // 获取楼层
  getFloorList(){
    request({url:"/home/floordata"}).then((res)=>{
      this.setData({
        floorList: res
      })
    })
  },
  routeToLink(e){
    let {name} = e.currentTarget.dataset;
    wx.switchTab({
      url: '/pages/category/index',
    })

       
  },
   
})
