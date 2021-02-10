// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击菜单
    currentIndex : 0
  },

  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  
  getCates(){
   request({
     url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
   }).then(res => {
     this.Cates = res.data.message;

     let leftMenuList = this.Cates.map(v => v.cat_name);

     let rightContent = this.Cates[0].children
     this.setData({
       leftMenuList,
       rightContent
     })
   })
  },
  //左侧菜单点击
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    this.setData({
      currentIndex : index
    })
  }
})