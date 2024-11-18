var token = localStorage.getItem('jwtToken');

$(document).ready(function () {
    loadTableData();
})
function loadTableData() {
    $.ajax({
        url: 'https://localhost:44324/api/User/GetUser',
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (data) {
            var tableBody = $('#dataTable tbody');
            tableBody.empty();
            console.log(data)
            data.forEach(item => {
                var isAdmin = item.roleId === 1;
                var adminIndicator = isAdmin ? '✔️' : '';
                var row = `<tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.lastName}</td>
                            <td>${item.email}</td>
                            <td>${adminIndicator}</td>
                            <td><button onclick="deleteUser(${item.id})" class="btn btn-danger">Sil</button></td>
                            <td><button class="btn btn-info updateUserDisplay" data-bs-toggle="modal" data-id="${item.id}" data-bs-target="#updateUserModal">Güncelle</button></td>
                        </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            UnAuthorize(xhr.status);
            console.log("Hata oluştu:", error);
        }
    });
}



function deleteUser(id) {
    if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
        $.ajax({
            url: 'https://localhost:44324/api/User/DeleteUser' + '?id=' + id,
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function () {
                alert("Kullanıcı başarıyla silindi.");
                loadTableData();
            },
            error: function (xhr, status, error) {
                UnAuthorize(xhr.status);

                console.log("Silme sırasında hata oluştu:", error);
            }
        });
    }
}


$(document).on('click', '.updateUserDisplay', function () {
    var id = $(this).data('id');
    console.log("aa")
    $.ajax({
        url: 'https://localhost:44324/api/User/GetByIdPerson/?id=' + id,
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            console.log("aaa")
            $('#updateUserId').val(response.id);
            $('#updateUserName').val(response.userName);
            $('#updateName').val(response.name);
            $('#updateLastName').val(response.lastName);
            $('#updateEmail').val(response.email);
            $('#updateRoleId').val(response.roleId);
            $('#updatePassword').val(response.password);

        },
        error: function (xhr, status, error) {
            UnAuthorize(xhr.status);
        }
    });
});


$(document).on('click', '#saveUpdateButton', function () {
    var user = {
        Id: $('#updateUserId').val(),
        UserName: $('#updateUserName').val(),
        Name: $('#updateName').val(),
        LastName: $('#updateLastName').val(),
        Email: $('#updateEmail').val(),
        RoleId: $('#updateRoleId').val(),
        Password: $('#updatePassword').val(),
    }
    $.ajax({
        url: 'https://localhost:44324/api/User/UpdatePerson',
        method: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        contentType: 'application/json',
        data: JSON.stringify(user),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {

            loadTableData();
            $('#updateUserModal').modal('hide');

        },
        error: function (xhr, status, error) {
            UnAuthorize(xhr.status);
        }
    });

})




$('#saveUserButton').click(function () {

    var userData = {
        userName: $('#userName').val(),
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        roleId: $('#roleId').val()
    };

    $.ajax({
        url: 'https://localhost:44324/api/User/AddUser',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (response) {
            console.log("Kullanıcı başarıyla eklendi:", response);
            $('#addUserModal').modal('hide');
            loadTableData();
        },
        error: function (xhr, status, error) {
            UnAuthorize(xhr.status);
            console.error("Kullanıcı eklenirken hata oluştu:", error);
            alert("Kullanıcı eklenirken hata oluştu.");
        }
    });
});
