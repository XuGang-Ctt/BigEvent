$(function () {
    //点击去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;  // 从layui获取formd对象
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],//密码
        repwd: function (value) {//确认密码
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    });//自定义校验规则

    // 点击注册按钮
    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 0, time: 1000 })
                }
                layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    $('#link_login').click();
                    $('#form-reg')[0].reset();
                })

            }
        });
    })

    //点击登录
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                console.log(res.token);
                location.href = '/index.html';
            }

        });
    })
});
