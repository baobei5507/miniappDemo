// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击菜单
    currentIndex : 0,
    scrollIndex : 0
  },

  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    //分类列表缓存
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()- Cates.time > 50000*10){
        this.getCates();
      }else{
        console.log("use storage")
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  
  async getCates(){
  //  request({
  //    url:'/categories'
  //  }).then(res => {
  //    this.Cates = res.data.message;

  //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
     
  //    let leftMenuList = this.Cates.map(v => v.cat_name);

  //    let rightContent = this.Cates[0].children
  //    this.setData({
  //      leftMenuList,
  //      rightContent
  //    })
  //  })

  const res = await request({url:'/categories'})
    this.Cates = res;

    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
     
     let leftMenuList = this.Cates.map(v => v.cat_name);

     let rightContent = this.Cates[0].children
     this.setData({
       leftMenuList,
       rightContent
     })
  },
  //左侧菜单点击
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex : index,
      rightContent,
      scrollIndex : 0
    })
  }
})