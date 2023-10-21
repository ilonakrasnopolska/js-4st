//Корзина для покупок

let productOfNameArr = ['Coffee', 'Coca-Cola', 'Bounty', 'Ice-cream'] //Массив для хранения названий продуктов
let productAmountArr = ['2', '3', '1', '2'] //Массив для хранения количества продукта
let productPriceArr = ['30', '15', '3', '30'] //Массив для хранения стоимости продукта
let productTotalPrice = [] //Массив для хранения общей стоимости каждого продукта взависимости от кол-во

let index = 0 //Переменная, которая хранит index элемента
let finalProductsPrice = 0 //Переменная хранит итоговую стоимость продуктов 
let productItem = '' //Переменная, которая будет принимать функцию для отрисовки li в функции render

function createDiv(classList) { //Функция создает Div
  let div = document.createElement('div')
  div.classList.add(classList)
  return div
}

function createInput(classList, type, placeholder) { //Функция создает input
  let input = document.createElement('input')
  input.classList.add(classList)
  input.type = type
  input.placeholder = placeholder
  return input
}

function createStrong(classList, text) { //Функция создает Strong
  let strong = document.createElement('strong')
  strong.classList.add(classList)
  strong.textContent = text
  return strong
}

function createParagraph(classList, text) { //Функция создает paragraph P 
  let p = document.createElement('p')
  p.classList.add(classList)
  p.textContent = text
  return p
}

function createSubtitle(element, classList, text) { //Функция создает title H
  let title = document.createElement(element)
  title.classList.add(classList)
  title.textContent = text
  return title
}

function createButton(classList, text) { //Функция создает btn 
  let btn = document.createElement('button')
  btn.classList.add(classList)
  btn.textContent = text
  return btn
}

function createSvg(src) { //Функция создает img
  const svgElement = document.createElement('img') //Создаем img
  svgElement.setAttribute('src', src) //принимает путь к img
  svgElement.setAttribute('width', '40') //принимает ширину img
  svgElement.setAttribute('height', '40') //принимает длину img
  return svgElement
}

function createList(classList) { //Функция создает ul
  let ul = document.createElement('ul')
  ul.classList.add(classList)
  return ul
}

function createListItem(classList) { //Функция создает li
  let li = document.createElement('li')
  li.classList.add(classList)
  return li
}

function createHeader() { //Функция создает шапку страницы
  let header = createDiv('header') //переменная принимает функцию,которая создает div - header
  let headerContainer = createDiv('header__container') //переменная принимает функцию которая создает div - header_container
  let title = createSubtitle('h1', 'header__title', 'Shopping basket') //переменная принимает функцию которая создает h1

  let inputWrapper = createDiv('header__input-wrap') //переменная принимает функцию, которая создает div в котором лежит input и svg
  let input = createInput('header__input', 'text', 'Search') //Создаем input
  let svgSearch = createSvg('./img/search.svg') //Переменная принимает функцию которая создает svg
  inputWrapper.append(input, svgSearch) 

  let svgBasket = createSvg('./img/basket.svg') //Переменная принимает функцию которая создает svg

  headerContainer.append(title, inputWrapper, svgBasket)
  header.append(headerContainer)
  return container.append(header) //Добавляем header в container 
}

function createComponentsForTable(product, amount, price) { //Функция собирает элементы внутри li воедино
  let contentBox = createDiv('list__item-content-wrap') //Div в котором находятся все элементы
  let nameTxt = createStrong('list__item-strong', 'Name') //Создает strong с надписью Name
  let title = createSubtitle('h3', 'list__item-title', product) //Создает subtitle с именем продукта
  let amountTxt = createStrong('list__item-strong', 'Amount')  //Создает strong с надписью Amount
  let amountNum = createStrong('list__item-txt', amount) //Создает strong с кол-во продукта
  let priceTxt = createStrong('list__item-strong', 'Price') //Создает strong с надписью Price
  let priceNum = createStrong('list__item-txt', price) //Создает strong со стоимостью продукта
  contentBox.append(nameTxt, title, amountTxt, amountNum, priceTxt, priceNum)
  return contentBox
}

function createTableProduct(name, amount, price) { //Функция создает таблицу продуктов 
  let li = createListItem('list__item') //Создаем li 
  let product = createComponentsForTable(`${name}`, `${amount}`, `${price}`) //переменная принимает функцию которая создает элементы внутри li
  let removeBtn = createButton('list__item-remove-btn', 'Remove') //Создаем кнопку удалить
  let editBtn = createButton('list__item-remove-btn', 'Edit') //Создаем кнопку редактировать

  
  li.append(product, removeBtn, editBtn)
  table.append(li) //Добавляем li в ul
  return li
}

function renderTable(productArr, amountArr, priceArr) { //Функция отрисовки таблицы 
  table.innerHTML = "" //Очищаем список перед отрисовкой

  for(i = 0; i < productOfNameArr.length; i++) { //Начинаем отрисовку используя массив и цикл 
    productItem = createTableProduct(productArr[i], amountArr[i], priceArr[i])
    table.append(productItem) //Добавляем li в ul
  }
} 

let container = createDiv('container') //создаем контейнер

createHeader()  //вызываем функцию которая создает шапку 

let table = createList('list') //переменая которая принимает функцию, которая создает ul

renderTable(productOfNameArr, productAmountArr, productPriceArr) //Вызываем функцию отрисовки table


container.append(table)
document.body.append(container)