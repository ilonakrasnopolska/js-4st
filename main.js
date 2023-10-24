//Корзина для покупок

let imgArr = ['./img/coffee.png', './img/cocacola.png', './img/bounty.png', './img/icecream.png']; //Массив фото
let productOfNameArr = ['Coffee', 'Coca-Cola', 'Bounty', 'Ice-cream'] //Массив для хранения названий продуктов
let productAmountArr = ['2', '3', '1', '2'] //Массив для хранения количества продукта
let productPriceArr = ['30', '15', '3', '30'] //Массив для хранения стоимости продукта
let productTotalPrice = [] //Массив для хранения общей стоимости каждого продукта взависимости от кол-во

let index = 4 //Переменная, которая хранит index элемента
let basketProductAmount = '' //Переменная которая будет создавать элемент с index продуктов в корзине

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

function createSvgButton(src) { //Функция создает button в котором находится svg
  const svgButton = createButton('header__svg-btn') //Создаем кнопку в которой будет находится svg
  const svgElement = document.createElement('img') //Создаем img
  svgElement.setAttribute('src', src) //принимает путь к img
  svgElement.setAttribute('width', '40') //принимает ширину img
  svgElement.setAttribute('height', '30') //принимает длину img
  svgButton.append(svgElement) //Добавляем в кнопку svg 
  return svgButton
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

function createFinalPrice(finalCost) { //Функция создает блок итоговой цены

  let finalPrice = createDiv('final-price') //Создаем div
  let finalPriceTxt = createStrong('final-price__txt', `Total cost: ${finalCost}`) //Создаем strong cо стоимостью

  finalPrice.append(finalPriceTxt)
  container.append(finalPrice)
}

function createHeader() { //Функция создает шапку страницы
  let header = createDiv('header') //переменная принимает функцию,которая создает div - header
  let headerContainer = createDiv('header__container') //переменная принимает функцию которая создает div - header_container
  let title = createSubtitle('h1', 'header__title', 'Shopping basket') //переменная принимает функцию которая создает h1

  let inputWrapper = createDiv('header__input-wrap') //переменная принимает функцию, которая создает div в котором лежит input и svg
  let input = createInput('header__input', 'text', 'Search') //Создаем input
  let svgSearch = createSvgButton('./img/search.svg') //Переменная принимает функцию которая создает svg
  inputWrapper.append(input, svgSearch)

  let svgBasket = createSvgButton('./img/basket.svg') //Переменная принимает функцию которая создает svg
  basketProductAmount = createStrong('header__basket-number', `${index}`) //Создаем strong с index продуктов для корзины покупок
  svgBasket.append(basketProductAmount) //Добавляем strong к button , затем используя position absolute

  headerContainer.append(title, inputWrapper, svgBasket)
  header.append(headerContainer)
  return document.body.append(header) //Добавляем header в container 
}

function createComponentsForTable(product, amount, price) { //Функция собирает элементы внутри li воедино
  let contentBox = createList('list__item-content-wrap') //List в котором находятся все элементы

  const nameBlock = createListItem('list__item-content-block') //ListItem для name
  let nameTxt = createParagraph('list__item-paragraph', 'Name:') //Создает p с надписью Name
  let title = createSubtitle('h3', 'list__item-title', product) //Создает subtitle с именем продукта
  nameBlock.append(nameTxt, title)

  const amountBlock = createListItem('list__item-content-block') //ListItem для amount
  let amountTxt = createParagraph('list__item-paragraph', 'Amount:')  //Создает p с надписью Amount
  let amountNum = createStrong('list__item-txt', amount) //Создает strong с кол-во продукта
  amountBlock.append(amountTxt, amountNum)

  const priceBlock = createListItem('list__item-content-block') //ListItem для price
  let priceTxt = createParagraph('list__item-paragraph', 'Price:') //Создает p с надписью Price
  let priceNum = createStrong('list__item-txt', price) //Создает strong со стоимостью продукта
  priceBlock.append(priceTxt, priceNum)

  contentBox.append(nameBlock, amountBlock, priceBlock)
  return contentBox
}

function createTableProduct(picSrc, name, amount, price) { //Функция создает таблицу продуктов 
  let li = createListItem('list__item') //Создаем li 
  li.style.backgroundImage = `url(${picSrc})` //добавляем backg-img к li

  let product = createComponentsForTable(`${name}`, `${amount}`, `${price}`) //переменная принимает функцию которая создает элементы внутри li

  const buttonWrapper = createDiv('list__item-btn-wrapper')

  const editBtn = createButton('list__item-edit-btn', 'Edit') //Создаем кнопку редактировать
  editBtn.onclick = function () {
    let productName = prompt('Enter product of name:') //Переменная принимает prompt

    //Проверка был ли введен текст или нажата отмена 
    if (productName !== null) {
      let productAmount = prompt('Enter amount of product:') //Переменная принимает prompt
      let productPrice = prompt('Enter product price:') //Переменная принимает prompt
      //Проверка были ли введены числа
      if (productAmount !== null && productPrice !== null && !isNaN(productAmount) && !isNaN(productPrice)) {
        // Находим индекс текущей карточки продукта
        const cardIndex = Array.from(table.children).indexOf(li)

        // Обновляем значения в массивах
        productOfNameArr[cardIndex] = productName
        productAmountArr[cardIndex] = Number(productAmount)
        productPriceArr[cardIndex] = Number(productPrice)


        renderTable(imgArr, productOfNameArr, productAmountArr, productPriceArr) //Вызываем функцию отрисовки table
      }
      // Пользователь нажал "Отмена" или закрыл диалог prompt
      else if (productAmount === null || productPrice === null) {
        alert('Incorrect data!')
      }
    }


  }

  const removeBtn = createButton('list__item-remove-btn', 'Remove') //Создаем кнопку удалить
  removeBtn.onclick = function () {

    if (confirm('Are you sure that you want to remove the product?')) { //Условие при клике на кнопку удалить
      li.remove() //удаляем li
      
      productPriceArr.splice(price, 1); //Удаляем из массива index
      productAmountArr.splice(price, 1); //Удаляем из массива index
      productOfNameArr.splice(price, 1); //Удаляем из массива index

      finalProductsPrice -= price; //Отнимаем стоимость от итоговой цены

      //Условие проверки есть ли блок с итоговой ценой, если есть заменяем на новый
      if (container.querySelector('.final-price')) { 
        container.querySelector('.final-price').remove(); // Удалить предыдущий блок с итоговой ценой
      }

      createFinalPrice(finalProductsPrice) //Вызываем функцию которая создает блок итоговой стоимости

      index-- //Уменьшаем значение index в корзине для покупок
      basketProductAmount.textContent = index; // Обновляем текст с количеством продуктов

      const remainingItems = document.querySelectorAll('.list__item'); //Находим все элементы к классом list-item
      if (remainingItems.length === 1) { //Условие, если длина элементов равна 1
        remainingItems[0].classList.add('last-item'); // Если остался только один элемент, добавляем ему новый класс
        table.classList.add('list-one-object') //Добавляем класс к ul
      }

      if (table.querySelectorAll('li').length === 0) { //Проверка на отсутствие li в ul
        table.remove() //удаление ul
        let emptyList = createStrong('empty-list', 'Basket is empty') //Создаем strong с надписью пустая корзина
        container.append(emptyList)
        container.querySelector('.final-price').remove(); // Удалить блок с итоговой ценой
      }
    }

  }

  buttonWrapper.append(editBtn, removeBtn) //append button edit и remove в div
  product.append(buttonWrapper) //append div с btn edit и remove в div с данными карточки
  li.append(product) //Добавляем div с контентом в li
  table.append(li) //Добавляем li в ul
  return li
}

function renderTable(picArr, productArr, amountArr, priceArr) { //Функция отрисовки таблицы 
  table.innerHTML = "" //Очищаем список перед отрисовкой
  index = 0 //Анулируем перед отрисовкой
  finalProductsPrice = 0; // Сбрасываем значение перед пересчетом итоговой стоимости

  for (i = 0; i < productOfNameArr.length; i++) { //Начинаем отрисовку используя массив и цикл 
    const price = parseFloat(priceArr[i]); // Преобразование цены в число
    productItem = createTableProduct(picArr[i], productArr[i], amountArr[i], priceArr[i])
    index++ //Добавляем к index + 
    finalProductsPrice += price // Увеличиваем общую стоимость на стоимость текущего продукта
    table.append(productItem) //Добавляем li в ul
  }
  //Условие проверки есть ли блок с итоговой ценой, если есть заменяем на новый
  if (container.querySelector('.final-price')) { 
    container.querySelector('.final-price').remove(); // Удалить предыдущий блок с итоговой ценой
  }
  createFinalPrice(finalProductsPrice) //Вызываем функцию которая создает блок итоговой стоимости
}

let container = createDiv('container') //создаем контейнер

createHeader()  //вызываем функцию которая создает шапку 

let table = createList('list') //переменая которая принимает функцию, которая создает ul
container.append(table)

renderTable(imgArr, productOfNameArr, productAmountArr, productPriceArr) //Вызываем функцию отрисовки table

document.body.append(container)