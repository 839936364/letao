$(function () {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    initScroll();

    function addHistory() {
        $(".btn-search").on('tap', function () {
            //获取到输入框里面的值,并且头尾不能是空格
            var search = $(".input-search").val().trim();
            if (search == "") {
                // 提示请输入要搜索 商品 使用MUI的消息框 自动消失消息框
                mui.toast('请输入合法搜索内容!', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }
            var searchHistory = localStorage.getItem("searchHistory");
            if (searchHistory) {
                searchHistory = JSON.parse(searchHistory);
            } else {
                searchHistory = [];
            }
            for (var i = 0; i < searchHistory.length; i++) {
                if (searchHistory[i].key == search) {
                    searchHistory.splice(i, 1);
                    i--;
                }
            }
            searchHistory.unshift({
                key: search,
                time: new Date().getTime()
            })
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            console.log(searchHistory);
            queryHistory();
            $('.input-search').val('');


        })
    }

    function queryHistory() {

        var searchHistory = localStorage.getItem("searchHistory");
        if (searchHistory) {
            searchHistory = JSON.parse(searchHistory);
        } else {
            searchHistory = [];
        }
        var html = template("searchHistoryTpl", { list: searchHistory });

        $('.mui-table-view').html(html);
    }

    function deleteHistory() {
        $(".mui-card-content ul").on("tap", "li span", function () {
            var index = $(this).data('index');
            var searchHistory = localStorage.getItem("searchHistory");
            searchHistory = JSON.parse(searchHistory);
            $(this).parent().remove();
            searchHistory.splice(index,1);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            queryHistory();
        })
    }

    function clearHistory() {
        $("#btn1").on("tap", function () {
            localStorage.removeItem("searchHistory");
            queryHistory();
        })
    }


    function initScroll() {
        mui('.mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            deceleration: 0.0006,
        });
    }


})