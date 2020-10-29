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
  cardsRestaurants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector(".container-promo"),
  restaurants = document.querySelector(".restaurants"),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu');



let login = localStorage.getItem("login");

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Помилка по адресу ${url}, 
    cтатус помилки ${response.status}!`);
  }

  return await response.json();

};

getData('./db/partners.json');





function toggleClass() {
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

  function logIn(event) {
    console.log(event);
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem("login", login);

    console.log('loginInput.value: ', loginInput.value);
    toggleClass();
    closeAuth.removeEventListener('click', toggleClass);
    btnAuth.removeEventListener('click', toggleClass);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();

    checkAuth();
  }

  closeAuth.addEventListener('click', toggleClass);
  btnAuth.addEventListener('click', toggleClass);
  logInForm.addEventListener('submit', logIn);
}



function checkAuth() {
  if (login) {
    autorised();
  } else {
    noAutorised();
  }
}



// RENDER CARD

function creatCardRestaurant(restaurant) {

  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery: timeOfDelivery
  } = restaurant;
  const card = `
    <a class="card card-restaurant" data-name="${name}" data-product="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}



function creteCardGood(goods) {

  const {
    id,
    name,
    description,
    price,
    image
  } = goods;
  const card = document.createElement('div');
  card.className = "card";
  card.insertAdjacentHTML("beforeend", `
          <img src="${image}" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">${description}
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">${price} ₽</strong>
            </div>
          </div>
  `);

  cardsMenu.append(card);
}


function creatTitleResturant(data) {
  const section = document.querySelector(".menu > .section-heading");
  console.log(section);

  const {
    name,
    stars,
    price,
    kitchen
  } = data;
  section.textContent = '';

  section.insertAdjacentHTML("afterbegin", `
         <h2 class="section-title restaurant-title">${name}</h2>
					<div class="card-info">
						<div class="rating">
							${stars}
						</div>
						<div class="price">От ${price} ₽</div>
						<div class="category">${kitchen}</div>
					</div>
  `);
}

function openGoods(event) {

  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    cardsMenu.textContent = "";
    restaurants.classList.add('hide');
    containerPromo.classList.add('hide');
    menu.classList.remove('hide');


    getData('./db/partners.json').then((data) => {
      data.forEach((item) => {
        if (restaurant.dataset.name == item.name) {
          console.log(item.name);
          creatTitleResturant(item);
        }
      });
    });


    getData(`./db/${restaurant.dataset.product}`).then((data) => {
      data.forEach(item => {

        creteCardGood(item);
      });
    });

    if (!login) {
      toggleClass();
    }
  }
}

function init() {
  checkAuth();

  getData('./db/partners.json').then((data) => {
    data.forEach((item, i) => {
      creatCardRestaurant(item, i);
    });
  });

  cardsRestaurants.addEventListener('click', openGoods);

  logo.addEventListener('click', () => {
    restaurants.classList.remove('hide');
    containerPromo.classList.remove('hide');
    menu.classList.add('hide');
  });
}

init();