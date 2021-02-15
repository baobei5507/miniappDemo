
let ajaxTimes = 0;
export const request = (params) =>{
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true
      });
    const url = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url : url + params.url,
            success:(res) =>{
                resolve(res.data.message);
            },
            fail:(res)=>{
                reject(res)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes === 0){
                    wx.hideLoading();
                }
                
            }
        })
    })
}