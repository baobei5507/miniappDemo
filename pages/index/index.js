// index.js

import {request} from "../../request/index.js";

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
    request({url:"/home/swiperdata"}).then((res)=>{
      this.setData({
        swiperList: res
      })
    })
  },
  // 获取分类导航
  getCatesList(){
    request({url:"/home/catitems"}).then((res)=>{
      this.setData({
        catesList: res
      })
    })
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
      const {index,key,link,name} = e.currentTarget.dataset;
        wx.navigateTo({
      url: link,
      events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
   
})
