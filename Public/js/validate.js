const logOut = ()=>{
    localStorage.removeItem('token');
}

const validateLogin = ()=>{
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    } 
}

document.addEventListener('DOMContentLoaded',()=> {
    validateLogin();
});
/*
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click',()=>{
    logOut();
    validateLogin();
})
*/