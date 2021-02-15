// pages/goods_detail/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        goods_id:goodsObj.goods_id,
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone部分手机不识别webp图片
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },

  //点击轮播图
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current,
    })
  },

  //点击 加入购物车
  handleCartAdd(){
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1){
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx-wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })

  }


})