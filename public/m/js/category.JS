$(function () {
    $.ajax({
        url: "/category/queryTopCategory",
        success: function (data) {
            console.log(data);
            var html = template("categoryLeftTpl", data);
            $('.category-left ul').html(html);
        }
    })


    var oldId = 0;
    querySecondCategory(1);
    $('.category-left ul').on('tap', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).data('id');
        if (id == oldId) {
            return false;
        }
        querySecondCategory(id);
        oldId = id;
    });

    function querySecondCategory(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data);
                var html = template('categoryRightTpl', data);
                $('.category-right .mui-row').html(html);
            }
        })
    }




    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0006,
    });
})