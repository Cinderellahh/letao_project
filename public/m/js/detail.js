var letao;
$(function(){
    letao=new Letao();
    // 轮播的调用
    letao.selectSize();
    letao.addCart();
    var id=getQueryString('id');  
    letao.getProductDetail(id);
})

var Letao=function(){

}

Letao.prototype={
    initSlide:function(){
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
      },

      //尺码的选中状态
      selectSize:function(){
          $('#product-detail').on('tap','.btn-size',function(){
            $(this).addClass('active').siblings().removeClass('active');
      })
    },
      //轮播图数据获取
      getProductDetail:function(id){
        $.ajax({
            url:"/product/queryProductDetail",
            data:{
                id:id
            },
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
                var html=template('productcontent',backData);
                $('#product-detail').html(html);
                //数字框重新初始化
                mui('.mui-numbox').numbox();
                //渲染轮播图
                var slideHtml=template('detailcarousel',backData);
                $("#carousel .mui-slider").html(slideHtml);
                letao.initSlide();
            }
        })
      },

      addCart:function(){
          $(".add-cart").on('tap',function(){
            //   console.log(1);
              var size=$(".product-size .btn-size.active").data('size');
            //   console.log(size);
            if(!size) {
                mui.toast('请选择尺码!',{ duration:'short', type:'div' }) 
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            if(!num){
                mui.toast('请选择数量!',{ duration:'short', type:'div' }) 
                return;
            }

            mui.confirm( '添加成功， 是否去购物车查看？','温馨提示', ['是','否'], function(e){
            	// 回调函数可以传递参数 e  e.index == 0 表示点击了左边的是 为1 表示点击了右边的否
            	if(e.index == 0){
            		console.log('正在进入购物车');
            	}else if(e.index == 1){
            		console.log('请继续选择尺码数量');
            	}
            });
          })
      }

}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}