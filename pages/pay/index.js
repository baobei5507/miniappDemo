
import { getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx";

Page({

  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0,
    modalHidden: true
  },

  onShow(){
    const address = wx.getStorageSync('address');

    let cart = wx.getStorageSync('cart') || [];
    //结算选中的商品
    cart = cart.filter(v=> v.checked);
    this.setData({
      address
    })
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
   
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
   

  },

  Pay(){
    this.setData({
      modalHidden:false
    })
    
  },

  //支付失败
  modalCancel(){
    this.setData({
      modalHidden:true
    })
  },

  //支付成功
  modalConfirm(){
    this.setData({
      modalHidden:true
    })
    wx.showToast({
      title: '支付成功!',
      duration : 2000,
      icon:'success',
      success:function(){
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/cart/index',
          })
        },2000)
      }
    })
    let cart = wx.getStorageSync('cart');
    cart = cart.filter(v=>!v.checked);
    wx.setStorageSync('cart', cart)
    
  },


  

})