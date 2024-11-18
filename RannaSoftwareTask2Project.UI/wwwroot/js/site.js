// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function checkToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const isValid = validateToken(token);
        if (!isValid) {
            logout();
        }
    } else {
        window.location.href = '/login.html';
    }
}

function validateToken(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
}

function UnAuthorize(xhrstatus) {
    if (xhrstatus === 403 || xhrstatus === 401) {
        window.location.href = '/Home/UnAuthorizePage';
    }
}





function tokencheck() {

    var token = localStorage.getItem('jwtToken');
    if (token) {
        var decodedToken = JSON.parse(atob(token.split('.')[1]));
        role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        var tokenExpirationDate = new Date(decodedToken.exp * 1000);
        var currentDate = new Date();

        if (currentDate < tokenExpirationDate) {
            console.log("Gecerli")
            return true;

        } else {
            console.log("gecersiz");
            localStorage.removeItem('token');
            return false;
        }
    } else {
        console.log("yok")
        return false;
    }
}
var isTokenValid = tokencheck();
if (isTokenValid) {


    if (role === "Admin") {
        var user = document.createElement("li");
        user.className = "nav-item";
        user.innerHTML = `<a class="nav-link text-dark" href="/User/Index">Kişiler</a>`;
        navLinks.appendChild(user);

        var form = document.createElement("li");
        form.className = "nav-item";
        form.innerHTML = `<a class="nav-link text-dark" href="/Product/Index">Ürünler</a>`;
        navLinks.appendChild(form);
    } else {
        var userLink = document.createElement("li");
        userLink.className = "nav-item";
        userLink.innerHTML = `<a class="nav-link text-dark" href="/Product/GetMyProduct">Kişisel ürünler</a>`;
        navLinks.appendChild(userLink);
    }

    var logoutLink = document.createElement("li");
    logoutLink.className = "nav-item";
    logoutLink.innerHTML = `<a class="nav-link text-dark" href="/" id="logoutLink">Çıkış</a>`;
    navLinks.appendChild(logoutLink);
} else {
    var productlist = document.createElement("li");
    productlist.className = "nav-item";
    productlist.innerHTML = `<a class="nav-link text-dark" href="/Product/GetAllProduct">Ürünler</a>`;
    navLinks.appendChild(productlist);

    var loginLink = document.createElement("li");
    loginLink.className = "nav-item";
    loginLink.innerHTML = `<a class="nav-link text-dark" href="/Auth/Login">Giriş</a>`;
    navLinks.appendChild(loginLink);

    var registerLink = document.createElement("li");
    registerLink.className = "nav-item";
    registerLink.innerHTML = `<a class="nav-link text-dark" href="/Auth/Register">Kayıt</a>`;
    navLinks.appendChild(registerLink);

   
}

$(document).on("click", '#logoutLink', function (e) {
    e.preventDefault()
    console.log("sdfgh")
    localStorage.removeItem('jwtToken');

    navLinks.removeChild(logoutLink);

    window.location.href = '/home'; 
});


function parseJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }
    return {
        header: JSON.parse(atob(parts[0])),
        payload: JSON.parse(atob(parts[1])),
        signature: parts[2]
    };
}

function getUserIdFromToken(token) {
    try {
        const jwt = parseJWT(token);
        const userId = jwt.payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        return userId;
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}
