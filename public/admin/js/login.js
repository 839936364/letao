$(function () {
    $(".btn-login").on("click", function () {
        var username = $("#username").val().trim();
        if (username == "") {
            alert('请输入用户名');
            return false;
        }
        var password = $("#password").val().trim();
        if (password == "") {
            alert('请输入密码');
            return false;
        }


        $.ajax({
            url: '/employee/employeeLogin',
            type: "post",
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    alert(data.message)
                } else {
                    location = 'index.html'
                }
            }

        })

    })
})