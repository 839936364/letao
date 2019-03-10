$(function () {
    register();
    getVCode();
    var vCode = '';
    function register() {
        $(".mui-button-row .btn-register").on("tap", function () {
            var isChecked = true;
            var inputs = $(".mui-input-row input");
            console.log(inputs);

            inputs.each(function () {
                if (this.value.trim() == "") {
                    mui.toast(this.placeholder, {
                        duration: 1000,
                        type: 'div'
                    });
                    isChecked = false;
                    return false;
                }
            })
            if (isChecked) {
                var mobile = $(".mobile").val().trim();
                if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)) {
                    mui.toast('手机号输入不合法', {
                        duration: 1000,
                        type: 'div'
                    });
                    return false;
                }
                var username = $(".username").val().trim();
                if (!/^[0-9a-zA-Z]{6,12}$/.test(username)) {
                    mui.toast('用户名不合法6-12之间的字母或者数字', {
                        duration: 1000,
                        type: 'div'
                    });
                    return false;
                }
                var password1 = $(".password1").val().trim();
                var password2 = $(".password2").val().trim();
                if (password1 != password2) {
                    mui.toast("两次输入的密码不一样", {
                        duration: 1000,
                        type: 'div'
                    });
                    return false;
                }
                var vcode = $('.vcode').val().trim();
                if (vcode != vCode) {
                    mui.toast('验证码输入错误', {
                        duration: 1000,
                        type: 'div'
                    });
                    return false;
                }
                $.ajax({
                    url: '/user/register',
                    type: 'post',
                    data:{
                        username:username,
                        mobile: mobile,
                        password: password1,
                        vCode: vCode
                    },
                    success:function(data){
                        if (data.error) {
                            mui.toast(data.message, {
                                duration: 1000,
                                type: 'div'
                            });
                        } else {
                            // 7. 没有失败就成功成功就跳转 到登录页面 (登录成功不能再返回注册 应该登录成功去到主页或者个人中心)
                            location = 'login.html?returnurl=user.html';
                        }
                       
                    }
                })
            }
        })
    }
    function getVCode() {
        $(".btn-get-vcode").on("tap", function () {
            $.ajax({
                url: "/user/vcode",
                success: function (data) {
                    console.log(data);
                    if (data.vCode) {
                        // $(".vcode").val(data.vCode)
                        vCode = data.vCode;
                    }
                }
            })
        })
    }
})