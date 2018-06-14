var letao;
var id;
$(function(){
    letao=new Letao();
    // 轮播的调用
    letao.selectSize();
    //加入购物车调用
    letao.addCart();
    //获取URL中的值
    id=getQueryString('id');  
    //调用获取商品详情的方法并传递一个id值
    letao.getProductDetail(id);
})

var Letao=function(){

}

Letao.prototype={
    //轮播图的初始化代码
    initSlide:function(){
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
      },

      //尺码的选中状态
      selectSize:function(){
          //给选中的尺码增加背景颜色,也就是增加一个类
          $('#product-detail').on('tap','.btn-size',function(){
            $(this).addClass('active').siblings().removeClass('active');
      })
    },
      //轮播图数据获取
      getProductDetail:function(id){
          //ajax请求数据,传递参数
        $.ajax({
            url:"/product/queryProductDetail",
            data:{
                id:id
            },
            //返回的数据
            success:function(backData){
                console.log(backData);
                //切割返回的数据
                var start=backData.size.split('-')[0]-0;
                var end=backData.size.split('-')[1]-0;
                //声明一个空的数据
                var arr=[];
                //遍历数组存起来
                for(var i=start;i<end;i++){
                    arr.push(i);
                }
                console.log(arr);
                //重新赋值
                backData.data=arr;
                console.log(backData);
                //模板引擎渲染页面
                var html=template('productcontent',backData);
                $('#product-detail').html(html);
                //数字框重新初始化
                mui('.mui-numbox').numbox();
                //渲染轮播图
                var slideHtml=template('detailcarousel',backData);
                $("#carousel .mui-slider").html(slideHtml);
                //轮播图的调用,实际是要等页面渲染完成之后在调用
                letao.initSlide();
            }
        })
      },

      addCart:function(){
          //给加入购物车一个点击事件
          $(".add-cart").on('tap',function(){
            //   console.log(1);
            //获取被选中的尺码
              var size=$(".product-size .btn-size.active").data('size');
            //   console.log(size);
            //判断尺码是否为空
            if(!size) {
                //如果是空就提示
                mui.toast('请选择尺码!',{ duration:'short', type:'div' }) 
                return;
            }
            //获取数量
            var num = mui('.mui-numbox').numbox().getValue();
            //如果没有值就提示选择
            if(!num){
                mui.toast('请选择数量!',{ duration:'short', type:'div' }) 
                return;
            }
            //发送数据请求加入购物车
            $.ajax({
                url:"/cart/addCart",
                data:{'productId':id,'num':num,'size':size},
                type:'post',
                success:function(backData){
                    if(backData.success){
                        mui.confirm( '添加成功， 是否去购物车查看？','温馨提示', ['是','否'], function(e){
                            // 回调函数可以传递参数 e  e.index == 0 表示点击了左边的是 为1 表示点击了右边的否
                            if(e.index == 0){
                              window.location.href='shoppingcart.html';
                            }else if(e.index == 1){
                                console.log('请继续选择尺码数量');
                            }
                        });
                    }else{
                       window.location.href="login.html";
                    }
                }
            })

          })
      }

}

//获取url 中的值得方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}