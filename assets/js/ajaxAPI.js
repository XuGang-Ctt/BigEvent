var baseUrl = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (option) {
    option.url = baseUrl + option.url;
})