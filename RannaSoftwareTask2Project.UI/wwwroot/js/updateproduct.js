var token = localStorage.getItem('jwtToken');

$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id'); 

    if (productId) {
        $.ajax({
            url: 'https://localhost:44324/api/Product/ProductGetById/?id=' + productId,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                console.log(response)
                $('#productId').val(response.id);
                $('#userId').val(response.userId);

                $('#productNameUpdate').val(response.productName);
                $('#productCodeUpdate').val(response.productCode);
                $('#productPriceUpdate').val(response.productPrice);

                if (response.image && response.image.trim() !== '') {
                    $('#currentImage').attr('src', response.image).show().css({ 'max-width': '100px', 'height': 'auto' });
                } else {
                    $('#currentImage').hide();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ürün bilgileri alınırken bir hata oluştu: ' + errorThrown);
            }
        });
    } else {
        alert('Ürün ID bulunamadı.'); 
    }

    $(document).on('click', '#updateproduct', function () {
        const productId = $('#productId').val();
        const userid = $('#userId').val();
        const productName = $('#productNameUpdate').val();
        const productCode = $('#productCodeUpdate').val();
        const productPrice = $('#productPriceUpdate').val();
        const currentImage = $('#currentImage').attr('src'); 
        const fileImage = $('#fileImageUpdate')[0].files[0];
        console.log(fileImage)
        console.log(currentImage)

        const formData = new FormData();
        formData.append('Id', productId);
        formData.append('UserId', userid);
        formData.append('productName', productName);
        formData.append('productCode', productCode);
        formData.append('productPrice', productPrice);
        if (fileImage) {
            console.log("aaaaa")
            formData.append('fileImage', fileImage);
        }
        else {
            console.log("bbb")
            formData.append('CurrentImage', currentImage);
        }
        $.ajax({
            url: 'https://localhost:44324/api/Product/UpdateProduct',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (response) {
                alert('Ürün başarıyla güncellendi!');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ürün bilgileri alınırken bir hata oluştu: ' + errorThrown);
            }
        })
    })
})