$(function () {
    var letao = new Letao();
    letao.login();
})

var Letao = function () {

}

Letao.prototype = {
    //实现登录功能
    login: function () {
        $('.main .login').on('tap', function () {
            //获取登录和密码的值
            var username = $('.username').val();
            var password = $('.password').val();

            //判断内容是否为空
            if (!username) {
                mui.toast('请输入用户名!', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!password) {
                mui.toast('请输入密码!', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            }
            //调用接口传递数据验证用户信息
            $.ajax({
                url: "/user/login",
                type: "post",
                data: {
                    'username': username,
                    'password': password
                },
                success: function (backData) {
                    if (backData.success) {
                        console.log('登录成功!');
                        // 跳转到上一页
                        var url = JSON.parse(window.sessionStorage.getItem("url"));
                        window.location.href = url[url.length - 2];
                    } else {
                        mui.toast(backData.message, {
                            duration: 'short',
                            type: 'div'
                        })
                    }
                }
            })
        })
    }
}