$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var loginDto = JSON.stringify({
            UserName: username,
            Password: password
        });

        $.ajax({
            url: 'https://localhost:44324/api/Login/Login',
            type: 'POST',
            contentType: 'application/json',
            data: loginDto,
            success: function (response) {
                console.log(response);
                localStorage.setItem('jwtToken', response.token);
                window.location.href = '/Home/Index'
            },
            error: function (xhr, status, error) {
                $('#loginError').text('Giriş başarısız! Kullanıcı adı veya şifre hatalı.').show();
            }
        });
    });
});
