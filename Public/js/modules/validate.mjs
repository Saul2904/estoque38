const logOut = ()=>{
    localStorage.removeItem('token');
}

const validateLogin = ()=>{
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    } 
}

export {logOut, validateLogin}