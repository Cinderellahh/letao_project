var letao;
    // 调用
    $(function(){
    //new一个对象
    letao=new Letao();
    //上下拉调用
    letao.initpullRefresh();
    //搜索调用
    letao.searchProductList();
   
    letao.productSort();
    //获取数据的调用,一进来通过搜索页面传递的数据渲染页面
    search=getQueryString('search');
        console.log(search);
    letao.getProductList({
        proName:search
    },function(backData){
       var html=template('getProduct',backData);
       $('.content .mui-row').html(html);
        })
    })

    //声明一个Letao构造函数
    var Letao =function() {

    }

    var search;
    var page = 1;
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
                            //下拉刷新再次请求数据
                            letao.getProductList({
                                proName:search
                            },function(backData){
                                var html=template('getProduct',backData);
                                $('.content .mui-row').html(html);
                                //下拉完成提示下拉完成
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                // //拉到底了要重置page 
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                page =1;
                            })

                        },1000)
                    } 
                  },
                  up:{
                        contentnomore:'再下实在给不了更多...',
                        contentrefresh:'我是有底线的',
                        callback :function(){
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        setTimeout(function(){
                            //上拉刷新再次请求数据
                            letao.getProductList({
                                proName:search,
                                page:++page                              
                            },function(backData){
                                var html=template('getProduct',backData);
                                // 上拉的时候是append
                                $('.content .mui-row').append(html);
                                //上拉判断是否还有数据,如果有数据就还可以继续加载                             
                                if(backData.data.length>0){
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();

                                }else{
                                    //如果没有数据了就提示没有更多的数据了
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);

                                }
                                
                            })

                        },1000)
                    } 
                  }                  
                }               
              })
            },

            //公共搜索商品列表
            searchProductList:function(){
                //给搜索按钮设置一个点击事件
                $('.search-button').on('tap',function(){
                    //获取搜索框的值
                    var search =$('.search-input').val();
                    //把搜索框的值传递
                    letao.getProductList({
                        proName:search
                        // page:1
                    },function(backData){
                        //公共的搜索出来的数据渲染页面
                        var  html =template('getProduct',backData);
                        $('.content .mui-row').html(html);
                    });
                })
               
            },

            //获取商品的函数
            getProductList:function(obj,callback){
                //使用ajax获取数据
                $.ajax({
                    url:"/product/queryProduct",
                    //先获取所有的商品数据
                    data:{
                        page:obj.page || 1,
                        pageSize:obj.pageSize || 2,
                        proName: obj.proName,
                        price:obj.price,
                        num:obj.num
                    },
                    success:function(backData){
                        // console.log(backData);
                        // console.log(backData.data.length)
                        if(callback) {
                            callback(backData);
                        }
                    }
                })
            },
            
            //排序
            productSort:function(){
               $('.product-rank').on('tap','a',function(){
                   //给a设置两个属性,并动态获取
                   var sorttype =$(this).data('sort-type');
                   console.log(sorttype);
                   //获取排序的自定义属性的值
                   var sort =$(this).data('sort');
                   console.log(sort);
                   //if判断身上的sort
                    if(sort==1){
                        //如果是1的话改成2
                        sort=2
                    }else{
                        //如果是2就改成1 
                        sort=1
                    }

                    //每次点击一下就修改一下这个排序的自定义属性的值
                    $(this).attr('data-sort',sort);
                    //判断点击是哪个按钮并执行相应的代码
                    if(sorttype=='price'){
                        //如果是price的话就传递price和搜索的值
                        letao.getProductList({
                            proName:search,
                            price:sort
                        },function(backData){
                            //回调函数中渲染页面
                            var html=template('getProduct',backData);
                            $('.content .mui-row').html(html);
                        })
                        //如果是num就传递搜索的值和num值
                    }else if(sorttype=='num'){
                        //传递之后在回调函数中渲染页面
                        letao.getProductList({
                            proName:search,
                            num:sort
                        },function(backData){
                            var html=template('getProduct',backData);
                            $('.content .mui-row').html(html);
                        })
                    }
               })
            },                
        }
        //这个是获取url中的值得方法
        //获取url地址栏的参数的函数 网上找的  name就是url参数名
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            } else {
                return null;
            }
        }