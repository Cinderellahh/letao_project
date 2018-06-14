$(function () {
    var base = new Base();
    base.saveUrl();

})

var Base = function () {};

Base.prototype = {
    saveUrl: function () {
        var data = JSON.parse(window.sessionStorage.getItem("url"));
        if (!data) {
            var arr = [];
            var url = window.location.href;
            arr.push(url)
            window.sessionStorage.setItem("url", JSON.stringify(arr))
        } else {
            if (data[data.length - 1] == window.location.href) {
                return;
            } else {
                data.push(window.location.href);
                window.sessionStorage.setItem("url", JSON.stringify(data));
            }

        }
    }

}