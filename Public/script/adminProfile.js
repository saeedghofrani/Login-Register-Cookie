$(document).ready(function () {
    let data = [];

    $('#saveAdmin').click(function (e) {
        e.preventDefault();
        for (let i = 0; i < $('tr').length - 1; i++) {
            data.push({
                username: $(`#tr${i} p.username.p-1.inp_admin_profile`).text().trim(), email: $(`#tr${i} input.email.p-1.inp_admin_profile`).val(),
                role: $(`#tr${i} input.role.p-1.inp_admin_profile`).val(), gender: $(`#tr${i} input.gender.p-1.inp_admin_profile`).val()
            });
        }
        console.log(data);
        $.ajax({
            type: "POST",
            url: "http://localhost:4000/adminProfileChange",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response.userArray);
                $('input').attr('disabled', 'disabled');
                $('input').attr('readonly', 'readonly');
                $('#saveBtn').removeAttr('disabled');
                $('#saveBtn').removeAttr('readonly');
                $('#edit').removeAttr('disabled');
                $('#edit').removeAttr('readonly');
                $('#done').css('display', 'block').fadeOut(5000);
            },
            error: (we) => {
                console.log(we);
            }
        });
    });
    $('#editAdmin').click(function (e) {
        e.preventDefault();
        $('input').removeAttr('disabled');
        $('input').removeAttr('readonly');
        for (let i = 0; i < $('tr').length - 1; i++) {
            if ($(`#tr${i} input.role.p-1.inp_admin_profile`).val() === "admin") {
                console.log('ssssssss');
                $(`#tr${i} p.username.p-1.inp_admin_profile`).attr('disabled', 'disabled');
                $(`#tr${i} p.username.p-1.inp_admin_profile`).attr('readonly', 'readonly');
                $(`#tr${i} input.email.p-1.inp_admin_profile`).attr('disabled', 'disabled');
                $(`#tr${i} input.email.p-1.inp_admin_profile`).attr('readonly', 'readonly');
                $(`#tr${i} input.role.p-1.inp_admin_profile`).attr('disabled', 'disabled');
                $(`#tr${i} input.role.p-1.inp_admin_profile`).attr('readonly', 'readonly');
                $(`#tr${i} input.gender.p-1.inp_admin_profile`).attr('disabled', 'disabled');
                $(`#tr${i} input.gender.p-1.inp_admin_profile`).attr('readonly', 'readonly');
            }
        }
    });

});