var letao;
$(function () {
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})

var Letao = function () {

}

Letao.prototype = {
    //1.添加记录
    addHistory: function () {
        //1.给搜索按钮设置点击事件
        $('.search-button').on('click', function () {
            //2.获取搜索框的值
            var text = $(".search-input").val();
            // window.localStorage.setItem('search',text);
            //判断input框里的内容是否为空
            //3.执行if 里面的代码是text.trim()为假
            if (!text.trim()) {
                alert('请输入你要输入的商品');
                return;
            }
            //4.获取原来里面的本地存储的内容
            var arr = window.localStorage.getItem("search");
            // console.log(arr);
            var id = 0;
            //5.判断是否有值
            //如果有h值
            if (arr && JSON.parse(arr).length > 0) {
                // 6.判读有值就解析这个数组  
                arr = JSON.parse(arr);
                // 存一个id                                
                id = arr[arr.length - 1].id + 1;
                console.log(id);

            } else {
                //7.如果一进来发现获取本地存储没有值,name就给arr赋值一个空的数组,并设置id的值为0;
                arr = [];
                id = 0;
            }
            console.log(arr);

            //8.push到arr的数组中,但是要判断原来的arr中是否存在,如果存在就存,不存在就不存
            var flag = false;
            for (var i = 0; i < arr.length; i++) {
                //遍历这个数组,数组里面的search键对应的值是否等于输入的值,如果相等就修改flag值
                if (arr[i].search == text) {
                    flag = true;
                }
            }
            //判断之后发先flag值还是没有改变,那么就存起来
            if (flag == false) {
                arr.push({
                    'search': text,
                    'id': id
                })
            }

            //9.添加到本地 但是存的时候arr这个是个数组要转换成字符串的进行存储
            window.localStorage.setItem("search", JSON.stringify(arr));

            //10.添加完成之后还是要刷新页面
            letao.queryHistory();

            //11.点击搜索按钮跳转页面
            window.location.href = "product.html?search="+text;

        })
    },

    //2.查询
    queryHistory: function () {
        //获取本地存储的值
        var arr = window.localStorage.getItem("search");
        //查询渲染,判断是否有值
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }

        //获取的数据进行翻转
        arr = arr.reverse();
        // console.log(arr);
        var html = template('searchData', {
            "rows": arr
        });
        $('.search-detail').html(html);

    },

    //3.删除
    deleteHistory: function () {
        // var that=this;
        $(".search-detail").on("click", ".chacha", function () {
            //获取点击这个叉叉上的id值
            var id = $(this).data('id');
            console.log($(this));
            //获取本地存储,并解析返回来的数据
            var arr = JSON.parse(window.localStorage.getItem("search"));
            console.log(arr);
            // 遍历数组,查找到这个对象中跟点击的ID一样的然后删除;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr.splice(i, 1);
                }
            }
            //删除之后重新保存数据
            window.localStorage.setItem("search",JSON.stringify(arr));
            //保存好之后然后重新获取数据渲染页面
            letao.queryHistory();
        })
    },

    //4.清空
    clearHistory: function () {
         $(".search-right").on('click',function(){
             window.localStorage.setItem('search','');
             letao.queryHistory();
         })   
    }

}