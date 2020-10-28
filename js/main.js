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
  buttonOut = document.querySelector('.button-out'),
  cardsRestaurants =document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector(".container-promo"),
  restaurants = document.querySelector(".restaurants"),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu');
  


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

// RENDER CARD

function creatCardRestaurant(){
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend",card);
}

creatCardRestaurant();
creatCardRestaurant();
creatCardRestaurant();


function creteCardGood() {
  const card = document.createElement('div');
  card.className = "card";
  card.insertAdjacentHTML("beforeend",  `
          <img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">Пицца Девичник</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук, маслины,
                грибы, помидоры, болгарский перец.
              </div>
            </div>
      
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">450 ₽</strong>
            </div>
          </div>
  `);
  
  console.log(card);
  cardsMenu.append(card);

  
}


function openGoods(event){
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  console.log('Це карта ресторану, яку ти нахрен клікнув');
  console.log(restaurant);

  if(restaurant){

    if(!login){
      toggleClass();
    }

    restaurants.classList.add('hide');
    containerPromo.classList.add('hide');
    menu.classList.remove('hide');
    cardsMenu.textContent = "";

    creteCardGood(); 
    creteCardGood(); 
    creteCardGood(); 
    creteCardGood(); 
  }
}


cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
    restaurants.classList.remove('hide');
    containerPromo.classList.remove('hide');
    menu.classList.add('hide');
});