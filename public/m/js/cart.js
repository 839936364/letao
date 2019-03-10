$(function () {
    queryCart();
    deleteCart();
    editCart();
    // 查询购物车功能
    function queryCart() {
        $.ajax({
            url: '/cart/queryCart',
            success: function (data) {
                if (data.error) {
                    location = 'login.html?returnurl=' + location.href;
                } else {
                    var html = template("cartListTpl", {
                        data: data,
                    })
                    $('.cart-list').html(html);
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0005
                    });
                    getCount();
                    $('.mui-checkbox input').on('change',function (){
                        getCount();
                    });
                }
            }
        })
    }
    function deleteCart() {
        $(".cart-list").on("tap", ".btn-delete", function () {
            // 用zepto把dom元素转换一下,用[0]
            var li = $(this).parent().parent()[0];
            var id = $(this).data("id");
            mui.confirm("您真的要删除我吗?", '温馨提示', ['确定', '取消'], function (e) {
                console.log(e);
                if (e.index == 0) {
                    $.ajax({
                        url: '/cart/deleteCart',
                        data: { id: id },
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                queryCart();
                            }
                        }
                    })
                } else {
                    mui.swipeoutClose(li);
                }
            })
        })
    }

    function editCart() {
        $(".cart-list").on("tap", ".btn-edit", function () {
            var product = $(this).data("product");
            console.log(product);
            var li = $(this).parent().parent()[0];
            var productSize = [];
 
            var min = product.productSize.split('-')[0] - 0;
            var max = product.productSize.split('-')[1] - 0;
            for (var i = min; i <= max; i++) {
                productSize.push(i);
            }
            product.productSize = productSize;
            var html = template('editCartTpl', product);
            html = html.replace(/[\r\n]/g, '');
            mui.confirm(html, '温馨提示', ['确定', '取消'], function (e) {
                if (e.index == 1) {
                    mui.swipeoutClose(li);
                } else {
                    var size = $('.mui-btn.mui-btn-warning').data('size');
                    console.log(size);

                    var num = mui('.mui-numbox').numbox().getValue();
                    $.ajax({
                        url: '/cart/updateCart',
                        type: 'post',
                        data: {
                            id: product.id,
                            size: size,
                            num: num
                        },
                        success: function (data) {
                            //如果编辑成功就调用查询刷新页面
                            if (data.success) { 
                                queryCart();
                            }
                        }
                    })
                }
            });
            mui('.mui-numbox').numbox();
            $('.product-size button').on('tap', function () {
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            });
        })
    }

    function getCount() {
        var checkeds = $('.mui-checkbox input:checked');
        console.log(checkeds);
        var sum = 0;
        checkeds.each(function () {
            var num = $(this).data("num");
            var price = $(this).data("price");
            console.log(num);
            var singleCount = price * num;
            sum += singleCount;
        })
        sum = sum.toFixed(2);
        $('.order-count span').html(sum);
    }
})