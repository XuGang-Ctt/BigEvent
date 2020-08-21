$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            // console.log(res.data.user_pic);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            $('.cropper-box img').attr('src', res.data.user_pic)
            $image.cropper('destroy').attr('src', res.data.user_pic).cropper(options);
        }
    })




    //点击按钮上传文件
    $('#btnFile').on('click', function () {
        $('#file').click();
    })

    // 文件上传改变图片
    $('#file').on('change', function () {
        $image.cropper('destroy').attr('src', URL.createObjectURL(this.files[0])).cropper(options);
    })

    // 上传文件
    $('#sure').on('click', function () {
        // base64格式图片
        var base64 = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: base64 },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('头像上传失败！')
                }
                layui.layer.msg('更换成功！');
                window.parent.getUserInfo();
            }
        })
    })
})