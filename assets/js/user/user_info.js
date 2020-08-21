$(function () {
    //自定表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6之间'
            }
        }
    });

    //初始化用户信息（渲染）
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data)
            }
        });
    }

    //表单重置按钮
    $('#resetBtn').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //表单提交按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜修改成功！');
                window.parent.getUserInfo();
            }
        });

    });
})