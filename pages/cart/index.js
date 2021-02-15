
import { getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx";

Page({

  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    const address = wx.getStorageSync('address');

    const cart = wx.getStorageSync('cart') || [];
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    this.setData({
      address
    })
    this.setCart(cart);
  },

  //点击收货地址
  async handleChooseAddress(){
    try{
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    if(scopeAddress === false){
      await wx.openSetting();
    }
    const address = await chooseAddress();
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    wx.setStorageSync('address', address)
  }catch(error){
    console.log(error)
  }
  },

  //商品的选中
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    //获取数组
    let {cart} = this.data;

    let index = cart.findIndex(v=> v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    
    this.setCart(cart)
   
  },

  //设置购物车状态 计算总值
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
    wx.setStorageSync('cart',cart)

  },

  //全选
  handleItemAllChange(){
    let {cart,allChecked} = this.data;
    allChecked =! allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart); 
  },

  //数量加减
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    console.log(operation,id)
    let {cart} = this.data;
    const index = cart.findIndex(v=> v.goods_id === id);
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content:"是否要删除"})
            if (res.confirm) {
                //删除元素
                cart.splice(index,1);
                this.setCart(cart);
              }
    }else{
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  //点击 结算
  async handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }

    if(totalNum === 0){
      await showToast({title:"您还没有添加商品"});
      return ;
    }

    wx.navigateTo({
      url: '/pages/pay/index',
    })

  },
  

})