
$(function () {
    var page = 1;
    var pageyema = 0;
    firstCategory();
    addCategory();
    function firstCategory() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: 5
            },
            success: function (data) {
                console.log(data);
                var html = template("firstCategoryTpl", data);
                $(".info tbody").html(html);
                pageyema = Math.ceil(data.total / data.size);
                initPage()
            }
        })
    }

    function initPage() {
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
            firstCategory();
        })
    }

    function addCategory() {
        $(".btn-save").on("click", function () {
            var categoryName = $(".category-name").val().trim();
            console.log(categoryName);
            if (categoryName == "" || categoryName.length > 3) {
                alert("不能超过三个数诶")
                return false;
            }
            $.ajax({
                url: "/category/addTopCategory",
                type: "post",
                data: {
                    categoryName: categoryName
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {

                        firstCategory();
                    }
                }
            })
        })
    }
})