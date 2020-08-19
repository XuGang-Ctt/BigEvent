$(function () {
    getUserInfo();

    //退出功能
    $('.quit').on('click', function () {
        layui.layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            //清空token
            localStorage.removeItem('token')
            //页面跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})
var layer = layui.layer;
//(封装在外面便于调用)
//封装全局配置获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            randerInfo(res.data);
        }
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    });
}

//封装渲染用户信息头像的函数   
function randerInfo(data) {
    //渲染用户名
    var name = data.nickname || data.username;
    $('.welcome').html('欢迎　' + name);
    //渲染头像
    var firstStr = name[0].toUpperCase();
    if (data.user_pic !== null) {
        $('.text-avatar').hide();
        $('.layui-nav-img').show();
    } else {
        $('.text-avatar').html(firstStr).show();
        $('.layui-nav-img').hide();
    }
}