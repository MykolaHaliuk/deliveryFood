const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// DAY 1

const btnAuth = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.close-auth'),
  logInForm = document.querySelector("#logInForm"),
  loginInput = document.querySelector("#login"),
  passwordInput = document.querySelector("#password"),
  userName = document.querySelector(".user-name"),
  buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem("login");

function toggleClass(){
  modalAuth.classList.toggle("is-open");
}



function autorised() {
  console.log("Авторизовано");

  function logOut() {
    login = "";
    localStorage.removeItem('login');
    btnAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener('click', logOut);


    checkAuth();
  }

  btnAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  userName.textContent = login;
  buttonOut.addEventListener('click', logOut);

}

function noAutorised() {
  
  console.log(" НЕ Авторизовано");

  function logIn(event){
    console.log(event);
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem("login",login);

    console.log('loginInput.value: ', loginInput.value);
    toggleClass();
    closeAuth.removeEventListener('click',toggleClass);
    btnAuth.removeEventListener('click', toggleClass);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();

    checkAuth();
  }

  closeAuth.addEventListener('click',toggleClass);
  btnAuth.addEventListener('click', toggleClass);
  logInForm.addEventListener('submit', logIn);
}



function checkAuth(){
  if(login){
    autorised();
  } else {
    noAutorised();
  }
}

checkAuth();
