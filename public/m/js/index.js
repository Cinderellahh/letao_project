
$(function(){
  //new一个对象
  var letao =new Letao();
  //对象点出方法
  letao.initSlide();
  letao.initScroll();
})

//声明一个构造函数
var Letao=function() {

}
//给构造函数的原型中添加方法
Letao.prototype = {
  initSlide:function(){
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
  },
  initScroll:function (){
    //内部滚动
    mui('.mui-scroll-wrapper').scroll({
      scrollY: true, //是否竖向滚动
     scrollX: false, //是否横向滚动
     startX: 0, //初始化时滚动至x
     startY: 0, //初始化时滚动至y
     indicators: true, //是否显示滚动条
     deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
     bounce: true //是否启用回弹
    });
  }

}
