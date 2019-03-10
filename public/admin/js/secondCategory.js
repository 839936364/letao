$(function () {
    var page = 1;
    var pageyema = 0;
    secondCategory();
    logoCategory();
    function secondCategory() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: 5,
            },
            success: function (data) {
                // console.log(data);
                var html = template("secondCategory", data);
                $(".info tbody").html(html);
                pageyema = Math.ceil(data.total / data.size);
                // console.log(pageyema);
                initPage();
            }
        })
    }



    function initPage() {
        var pages = [];
        for (var i = 1; i <= pageyema; i++) {
            pages.push(i);
        }
        var html = template("pageTpl", {
            pages: pages,
            page: page
        })
        $(".page-list").html(html);
        $(".page-list li").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            page = $(this).data("page");
            secondCategory();
        })
    }

    var file = null;
    function logoCategory() {
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.rows.length; i++) {
                    html += '<option value="' + data.rows[i].id + '">' + data.rows[i].categoryName + '</option>'
                }
                $('.select-category').html(html);
            }
        })


        $('.select-logo').change(function () {
            file = this.files[0];
            var url = URL.createObjectURL(file);
            $('img.brand-logo').attr('src', url);
        });

        $(".btn-save").on("click", function () {
            var brandName = $(".brand-name").val().trim();;
            var categoryId = $('.select-category').val();
            var formData = new FormData();
            formData.append('pic1', file);
            console.log(file);

            $.ajax({
                url: "/category/addSecondCategoryPic",
                type: "post",
                data: formData,
                processData: false,   //  告诉jquery不要处理发送的数据
                contentType: false,
                // 3.11 取消异步
                async: false,
                // 3.12 取消缓存
                cache: false,
                success: function (data) {
                    // console.log(data);
                    if (data.picAddr) {
                        var brandLogo = data.picAddr;
                        $.ajax({
                            url: " /category/addSecondCategory",
                            type: "post",
                            data: {
                                brandName: brandName,
                                categoryId: categoryId,
                                brandLogo: brandLogo,
                                hot: 1
                            },
                            success: function (data) {
                                console.log(data);
                                if (data.success) {
                                    secondCategory();
                                    $(".brand-name").val("");
                                    $('.select-category').val("");
                                    $(".input-group img").attr("src", "");
                                }
                            }
                        })
                    }
                }
            })
        })
    }
})