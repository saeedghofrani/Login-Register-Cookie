document.getElementById('done').style['display'] = 'none';
$(document).ready(function () {
    $('#saveBtn').click(function (e) {
        e.preventDefault();
        data = {
            username: $('#username').val(), email: $('#email').val(), password: $('#password').val(), gender: $('#gender').val()
        };
        console.log('profile script');
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/home/profile",
            data,
            success: function (response) {  
                if (response === 'exist') {
                    return alert('This username already exist ');
                }
                $('#userNameCard').text(response.username);
                $('input').attr('disabled', 'disabled');
                $('input').attr('readonly', 'readonly');
                $('#saveBtn').removeAttr('disabled');
                $('#saveBtn').removeAttr('readonly');
                $('#edit').removeAttr('disabled');
                $('#edit').removeAttr('readonly');
                $('#done').css('display', 'block').fadeOut(5000);
                if (response === 'wrong') {
                    window.location.href = 'http://localhost:4000/logout'
                }
              
            },
            error: (we) => {
                console.log(we);
            }
        });
    });
    $('#edit').click(function (e) {
        e.preventDefault();
        $('input').removeAttr('disabled');
        $('input').removeAttr('readonly');
    });
});