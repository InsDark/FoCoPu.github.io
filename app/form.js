const mainForm = document.querySelector('#sesion-form');

const loginForm = document.querySelector('#login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
})


const checkFormStatus = () => {
    const userNameRegister = document.querySelector('#username-register')
    userNameRegister.addEventListener('keydown', () => {
        userNameRegister.value === '' ? showError(userNameRegister.parentElement, 'Please type again your name', 'red') : showError(userNameRegister.parentElement, 'Your username is typed well', 'green')
    })
    const passwordRegister = document.querySelector('#password-register')
    passwordRegister.addEventListener('keydown', () => {
        passwordRegister.value === '' ? showError(passwordRegister.parentElement, 'Please type a correct password', 'red') : showError(passwordRegister.parentElement, 'Good password', 'green') 
    })
    
    const passwordMatchRegister = document.querySelector('#password-check-register')
    passwordMatchRegister.addEventListener('keydown', () => {
        passwordMatchRegister.value == passwordRegister.value ? showError(passwordMatchRegister.parentElement, 'Well passwords match :D', 'green') : showError(passwordMatchRegister.parentElement, 'Passwords does not match :D', 'red')
    })
}

const registerForm = document.querySelector('#register');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        mainForm.remove()

})

const showError = (site, msg, color) =>{
    const feedback = document.createElement('h5');
    feedback.style.position = 'absolute';
    feedback.style.textAlign = 'center';
    feedback.style.top = '60%'
    feedback.textContent = msg
    feedback.style.color = `${color}`
    site.appendChild(feedback);
    setTimeout(() => {
        feedback.remove()
    }, 1000)
} 

document.addEventListener('DOMContentLoaded', () => {
    const key = localStorage.getItem('key');
    key === null ? loginForm.classList.add('hide') : registerForm.classList.add('hide');
    checkFormStatus()
})