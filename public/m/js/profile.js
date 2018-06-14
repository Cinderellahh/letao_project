$(function(){
    var letao=new Letao();
    letao.getUserInfo();
    letao.loginOut();
})

var Letao=function(){

}

Letao.prototype={
    getUserInfo:function(){
        $.ajax({
            url:"/user/queryUserMessage",
            success:function(backData){
                console.log(backData);
                if(backData.error){
                    window.location.href="login.html";
                }else{
                    // window.location.href="profile.html";
                    $('.username').html(backData.username);
                    $('.mobile').html(backData.mobile);
                }
            }
        })
    },
    loginOut:function(){
        $('.login-out .login-button').on('tap',function(){
          $.ajax({
              url:"/user/logout",
              success:function(backData){
                console.log(backData);
              }  
          })  
        })
    }
}