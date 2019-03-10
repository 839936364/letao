$(function () {
    var page = 1;
    var pageyema = 0;

    queryUser();
    updateUser()
   
    function queryUser() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: 5
            },
            success: function (data) {
                // console.log(data);
                var html = template("userInfoTpl", data);
                $(".info tbody").html(html);
                pageyema = Math.ceil(data.total / data.size);
                initPage();
            }
        })
    }


    //更好用户状态
    function updateUser() {
        $(".info tbody").on("click", ".btn-btn1", function () {
            console.log(this);
            var isDelete = $(this).data("isdelete");
            isDelete = isDelete == 0 ? 1 : 0;
            // console.log(isDelete);
            $(this).data("isDelete", isDelete);
            var id = $(this).data("id");
            // console.log(id);

            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if (data.success) {
                        queryUser();
                    }
                }
            })
        })
    }
    function initPage() {
        // console.log(pageyema);
        var pages = [];
        for (var i = 1; i <= pageyema; i++) {
            pages.push(i);
        }
        console.log(pages);

        var html = template("pageTpl", {
            pages: pages,
            page: page
        })
        $('.page-list').html(html);
        $(".page-list li").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            page = $(this).data("page");
            queryUser();
        })
    }
})