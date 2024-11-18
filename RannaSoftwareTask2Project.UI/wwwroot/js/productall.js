$(document).ready(function () {
    getall()
    function getall() {
        $.ajax({
            url: 'https://localhost:44324/api/Product/ProductGetAll',
            type: 'GET',
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
})