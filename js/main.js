const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


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
  cardsMenu = document.querySelector('.cards-menu'),
  listCard = document.querySelector('.modal-body'),
  clearCart = document.querySelector('.clear-cart');


const cart = [];
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
    cartButton.style.display = "";
    buttonOut.removeEventListener('click', logOut);
    


    checkAuth();
  }

  btnAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "flex";
  userName.textContent = login;
  buttonOut.addEventListener('click', logOut);
  cartButton.style.display = "flex";


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
  card.id = id;
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


function addToCart(event) {

  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');
  console.log('buttonAddToCart: ', buttonAddToCart);

  if(buttonAddToCart){
    const card = target.closest('.card');
    console.log('cart: ', cart);
    const title = card.querySelector('.card-title-reg').textContent;
    const price = card.querySelector('.card-price-bold').textContent;
    const id  = card.id;

    const food = cart.find((item) =>{
      return item.id === id;
    });
   
    if(food){
      food.count +=1;
    } else  {
      cart.push({id,title,price,count:1});
    }
    
  }
  console.log(cart);


}

function renderCard(){

  const modalPrice = document.querySelector('.modal-pricetag');
  listCard.textContent = '';

  cart.forEach(({id, title, price, count}) =>{
    
    const row = `
      <div class="food-row">
      <span class="food-name">${title}</span>
      <strong class="food-price">${price}</strong>
      <div class="food-counter">
          <button class="counter-button counter-button-minus" data-id=${id} >-</button>
        <span class="counter">${count}</span>
        <button class="counter-button counter-button-plus" data-id=${id} >+</button>
        </div>
      </div>`;

    listCard.insertAdjacentHTML('afterbegin', row);
  });
  localStorage.setItem('cart',cart);
  

  const totalPrice = cart.reduce((res, item) => {
    return res + parseFloat(item.price) * item.count;
  },0);
  modalPrice.textContent = totalPrice +" ₽";
  
}

function changeCount(event) {
  const target = event.target;
  if(target.classList.contains("counter-button")){
      const food = cart.find((item) =>{return item.id === target.dataset.id;});
      if(target.classList.contains("counter-button-minus")){
        food.count--;
        if(food.count === 0){
          cart.splice(cart.indexOf(food),1);
        } 
      }
      if(target.classList.contains("counter-button-plus")){food.count++;}
  }
  renderCard();
}

function init() {
  checkAuth();

  getData('./db/partners.json').then((data) => {
    data.forEach((item, i) => {
      creatCardRestaurant(item, i);
    });
  });
  cardsRestaurants.addEventListener('click', openGoods);

  listCard.addEventListener('click', changeCount);

  cardsMenu.addEventListener("click", addToCart);
  cartButton.addEventListener("click", () =>{

    renderCard();
    toggleModal();
  });

  clearCart.addEventListener("click", () =>{
    cart.length = 0;
    renderCard();
  
  });
  

  logo.addEventListener('click', () => {
    restaurants.classList.remove('hide');
    containerPromo.classList.remove('hide');
    menu.classList.add('hide');
  });
  console.log(localStorage.getItem('cart'));
}

init();