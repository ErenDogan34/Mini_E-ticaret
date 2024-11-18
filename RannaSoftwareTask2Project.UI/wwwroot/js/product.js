var token = localStorage.getItem('jwtToken');

$(document).ready(function () {
    getall()
    function getall() {
        $.ajax({
            url: 'https://localhost:44324/api/Product/ProductGetAll',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                console.log(response);
                let rows = '';
                response.forEach(product => {
                    $.ajax({
                        url: 'https://localhost:44324/api/User/GetById/?id=' + product.userId,
                        type: 'GET',
                        contentType: 'application/json',
                        success: function (userResponse) {
                            rows += `
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.productName}</td>
                                <td>${product.productCode}</td>
                                <td>${product.productPrice}</td>
                                <td><img src="${product.image}" alt="Product Image" width="50"></td>
                                <td>${userResponse}</td> 
                                <td><button class="btn btn-primary update-btn" id="updatebtn" data-id="${product.id}">Güncelle</button></td>
                                <td><button id="btndelete" class="btn btn-danger delete-btn" data-id="${product.id}">Sil</button></td>
                            </tr>`;

                            // Tabloyu her yeni satır eklendiğinde güncelle
                            $('#dataTable tbody').html(rows);
                        },
                        error: function () {
                            console.log('Kullanıcı adı alınamadı');
                        }
                    });
                });
            },
            error: function () {
                alert('Ürünler alınırken hata oluştu');
            }
        });
    }



    $(document).on('click', '.update-btn', function () {
        var id = $(this).data('id');
        window.location.href = '/Product/UpdateProduct?id=' + id;
    })

    $('#productadd').click(function () {
        window.location.href = '/Product/AddProduct'; 
    });


    $('#addproduct').click(function () {
        var userid=getUserIdFromToken(token)[1]
        const productName = $('#productName').val();
        const productCode = $('#productCode').val();
        const productPrice = $('#productPrice').val();
        const fileImage = $('#fileImage')[0].files[0]; 

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productCode', productCode);
        formData.append('productPrice', productPrice);
        formData.append('userId', userid);
        if (fileImage) {
            formData.append('fileImage', fileImage); 
        }

        $.ajax({
            url: 'https://localhost:44324/api/Product/ProductAdd', 
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                alert('Ürün başarıyla yüklendi!'); 
                window.location.href = '/Product'; 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ürün güncellenirken bir hata oluştu: ' + errorThrown); 
            }
        });
    });

    $(document).on('click','#btndelete',function () {
        var id = $(this).data('id');

        if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            $.ajax({
                url: 'https://localhost:44324/api/Product/ProductDelete' + '?id=' + id,
                method: 'DELETE',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                },
                success: function () {
                    alert("Kullanıcı başarıyla silindi.");
                    getall();
                },
                error: function (xhr, status, error) {
                    UnAuthorize(xhr.status);

                    console.log("Silme sırasında hata oluştu:", error);
                }
            });
        }
    })
})