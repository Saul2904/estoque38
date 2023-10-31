const logOut = ()=>{
    localStorage.removeItem('token');
}

const validateLogin = ()=>{
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    } 
}

export {logOut, validateLogin}
/*
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click',()=>{
    logOut();
    validateLogin();
})
*/