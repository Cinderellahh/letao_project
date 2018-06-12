
    // 调用
    $(function(){
    //new一个对象
    var letao=new Letao();
    letao.initpullRefresh();
    letao.searchProductList();
    })

    //声明一个Letao构造函数
    var Letao =function() {

    }

    //在构造函数的原型链中增加方法
    Letao.prototype={
        initpullRefresh:function(){
            mui.init({
                pullRefresh : {
                  container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                  down : {
                    // height:50,//可选,默认50.触发下拉刷新拖动距离,
                    // auto: false,//可选,默认false.首次加载自动下拉刷新一次
                    // contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback :function(){
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function(){
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        },1000)
                    } 
                  },
                  up:{
                        contentnomore:'再下实在给不了更多...',
                        contentrefresh:'我是有底线的',
                      callback :function(){
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function(){
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        },1000)
                    } 
                  }                  
                }               
              })
            },

            searchProductList:function(){
                $.ajax({
                    url:"/product/queryProduct",
                    data:{},
                    success:function(backData){

                    }
                })
            }


    }