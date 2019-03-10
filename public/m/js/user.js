$(function () {
    queryUserMessage();
    exit();

    function queryUserMessage() {
        $.ajax({
            url: '/user/queryUserMessage',
            success: function (data) {
                console.log(data);
                $(".username").html(data.username);
                $(".mobile").html(data.mobile);
            }
        })
    }

    function exit() {
        $(".btn-exit").on("tap",function(){
            $.ajax({
                url:"/user/logout",
                success:function(data){
                    console.log(data);
                    if(data.success){
                        location = "login.html?returnurl="+location.href;
                    }
                }
            })
        })
        
    }
})