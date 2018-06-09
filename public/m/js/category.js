
    // 调用
    $(function(){
    //new一个对象
    var letao=new Letao();
    letao.getLeftData();
    letao.getRightData();
    })

    //声明一个Letao构造函数
    var Letao =function() {

    }

    //在构造函数的原型链中增加方法
    Letao.prototype={

        //请求左边的数据
        getLeftData:function (){
            $.ajax({
                url:"/category/queryTopCategory",
                success:function (data) {
                    // console.log(data);
                    var html=template("leftData",data);
                    $(".leftbar ul").html(html);
                }
            })
        },

        //请求右边的数据
        getRightData:function (){
            // 传入一个id 让默认的为第一页的数据
            getData(1);
            $(".leftbar ul li").eq(1).addClass("active");
            //给左边的父元素绑定点击事件
            $(".leftbar ul").on('click','a',function(e){
                // console.log(1111);
                // e.preventDefault();
                // 获取这个目标身上的id 值
                var id=e.target.dataset['id'];
                // 这个目标元素的父元素增加active,其他的兄弟去除active
                $(e.target.parentNode).addClass('active').siblings().removeClass('active')
                // console.log(id);
                //再次传入ID获取数据;
                getData(id);
            });

            function getData(id){
                $.ajax({
                    url:"/category/querySecondCategory",
                    data:{
                        id:id
                    },
                    success:function (data) {
                        // console.log(data);
                        var html=template("getdata",data);
                        if(html!=""){
                            $(".rightbar .mui-row").html(html);
                        }else {
                            $(".rightbar .mui-row").html("<h6>臣妾实在没有太多了!</h6>");
                        }
                    }
                })
            }
        },

    }