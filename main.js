//Корзина для покупок

let imgArr = ['./img/coffee.png', './img/cocacola.png', './img/bounty.png', './img/icecream.png']; //Массив фото
let productOfNameArr = ['Coffee', 'Coca-Cola', 'Bounty', 'Ice-cream'] //Массив для хранения названий продуктов
let productAmountArr = ['2', '3', '1', '2'] //Массив для хранения количества продукта
let productPriceArr = ['30', '15', '3', '30'] //Массив для хранения стоимости продукта
let counterArr = [1, 1, 1, 1] //Массив счетчиков для кол-во продуктов
let productTotalPriceArr = [] //Массив для хранения общей стоимости каждого продукта взависимости от кол-во

let index = counterArr.length //Переменная, которая хранит index элемента
let basketProductAmount = '' //Переменная которая будет принимать div с цифрой index продуктов в корзине

let updateProductPrice = 0 //Переменная которая будет обновлять стоимость 1 продукта при увеличении его кол-во
let finalProductsPrice = 0 //Переменная хранит итоговую стоимость всех продуктов 
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

function removeProductAfterSearchResult(startIndex, count) { //Функция для удаления li-item при поиске элементов

  // Удаляем count карточек начиная с startIndex
  productOfNameArr.splice(startIndex, count);
  productPriceArr.splice(startIndex, count);
  productAmountArr.splice(startIndex, count);
  counterArr.splice(startIndex, count);

  index = counterArr.length; // Обновляем значение index
  updateTotalPrice() //вызываем функцию подсчета итоговой стоимости
}

function createFinalPrice(finalCost) { //Функция создает блок итоговой цены

  let finalPriceFooter = createDiv('footer') //Создаем footer
  let finalPriceContainer = createDiv('footer__container') //Создаем div container
  let finalPriceTxt = createStrong('footer__final-price__txt', `Total cost: ${finalCost} $`) //Создаем strong cо стоимостью

  finalPriceContainer.append(finalPriceTxt) //Отправляем strong в div container
  finalPriceFooter.append(finalPriceContainer) //Отравляем container в footer
  document.body.append(finalPriceFooter)

}

function updateTotalPrice() { //Функция пересчета итоговой стоимости
  finalProductsPrice = 0; //переменная для итоговой стоимости

  for (let i = 0; i < counterArr.length; i++) {
    finalProductsPrice += counterArr[i] * productPriceArr[i]; //умножаем кол-во на стоимость
    basketProductAmount.textContent = index;
    finalProductsPrice.textContent = `Total cost: ${finalProductsPrice} $`
  }

  // Обновляем общую стоимость на странице
  if (document.querySelector('.footer')) {
    document.querySelector('.footer').remove();
  }
  return createFinalPrice(finalProductsPrice)
}

function createHeader() { //Функция создает шапку страницы
  let header = createDiv('header') //переменная принимает функцию,которая создает div - header
  let headerContainer = createDiv('header__container') //переменная принимает функцию которая создает div - header_container
  let title = createSubtitle('h1', 'header__title', 'Shopping basket') //переменная принимает функцию которая создает h1

  let inputWrapper = createDiv('header__input-wrap') //переменная принимает функцию, которая создает div в котором лежит input и svg
  let input = createInput('header__input', 'text', 'Search') //Создаем input
  let svgSearch = createSvgButton('./img/search.svg') //Переменная принимает функцию которая создает svg

  svgSearch.addEventListener('click', function () {
    let removeBeforeCards = ''//переменная для удаления элементов из массива до выбранного
    let removeAfterCards = '' //переменная для удаления элементов из массива после выбранного

    if (input.value === 'Coffee' || input.value === 'coffee') {
      let cards = document.querySelectorAll('.list__item'); // Находим все карточки
      for (let index = 1; index < cards.length; index++) {
        cards[index].remove(); // Удаляем все карточки, начиная со второй (индекс 1)
      }
      removeAfterCards = removeProductAfterSearchResult(Number(1), Number(3)) //вызываем функцию удаления продуктов из массива
      input.value = '' //очищаем input
    }

    else if (input.value === 'Coca-cola' || input.value === 'coca-cola' || input.value === 'Coca-Cola') {
      let cards = document.querySelectorAll('.list__item'); // Находим все карточки
      for (let index = 0; index < cards.length; index++) {
        if (index === 0 || index === 2 || index === 3) { //Если index li = 0 , 2 , 3
          cards[index].remove(); // Удаляем li с index 0 , 2 , 3
        }
      }
      removeBeforeCards = removeProductAfterSearchResult(Number(0), Number(1)) //вызываем функцию удаления продуктов из массива
      removeAfterCards = removeProductAfterSearchResult(Number(1), Number(3)) //вызываем функцию удаления продуктов из массива
      input.value = '' //очищаем input
    }

    else if (input.value === 'Bounty' || input.value === 'bounty') {
      let cards = document.querySelectorAll('.list__item'); // Находим все карточки
      for (let index = 0; index < cards.length; index++) {
        if (index === 0 || index === 1 || index === 3) { //Если index li = 0 , 1 , 3
          cards[index].remove(); // Удаляем li с index 0 , 1 , 3
        }
      }
      removeBeforeCards = removeProductAfterSearchResult(Number(0), Number(2)) //вызываем функцию удаления продуктов из массива
      productOfNameArr.pop() //удаляем последний обьект из массива
      productPriceArr.pop() //удаляем последний обьект из массива
      productAmountArr.pop() //удаляем последний обьект из массива
      counterArr.pop() //удаляем последний обьект из массива
      index--
      updateTotalPrice() //Обновляем итоговую стоимость

      input.value = '' //очищаем input
    }

    else if (input.value === 'Ice-cream' || input.value === 'ice-cream') {
      let cards = document.querySelectorAll('.list__item'); // Находим все карточки
      for (let index = 0; index < cards.length; index++) {
        if (index === 0 || index === 1 || index === 2) { //Если index li = 0 , 1 , 2
          cards[index].remove(); // Удаляем li с index 0 , 1 , 3
        }
      }
      removeBeforeCards = removeProductAfterSearchResult(Number(0), Number(3)) //вызываем функцию удаления продуктов из массива
      input.value = '' //очищаем input
    }

    else { //Проверка на введенные неверные символы в input 
      alert('Invalid input. Please enter a valid search term.');
      input.value = '' //очищаем input
      return; // Выходим из функции, так как введенное значение недопустимо
    }
  })

  inputWrapper.append(input, svgSearch)


  let svgBasket = createSvgButton('./img/basket.svg') //Переменная принимает функцию которая создает svg
  basketProductAmount = createStrong('header__basket-number', `${index}`) //Создаем strong с index продуктов для корзины покупок
  svgBasket.append(basketProductAmount) //Добавляем strong к button , затем используя position absolute

  headerContainer.append(title, inputWrapper, svgBasket)
  header.append(headerContainer)
  return document.body.append(header) //Добавляем header в container 
}

function createComponentsForTable(product, price) { //Функция собирает содержимое li воедино
  let contentBox = createList('list__item-content-wrap') //List в котором находятся все элементы

  const nameBlock = createListItem('list__item-content-block') //ListItem для name
  let nameTxt = createParagraph('list__item-paragraph', 'Name:') //Создает p с надписью Name
  let title = createSubtitle('h3', 'list__item-title', product) //Создает subtitle с именем продукта
  nameBlock.append(nameTxt, title)

  const priceBlock = createListItem('list__item-content-block') //ListItem для price
  let priceTxt = createParagraph('list__item-paragraph', 'Price:') //Создает p с надписью Price
  let priceNum = createStrong('list__item-txt', price) //Создает strong со стоимостью продукта
  priceBlock.append(priceTxt, priceNum)

  contentBox.append(nameBlock, priceBlock)
  return contentBox
}

function createTableProduct(picSrc, name, price, count) { //Функция создает таблицу продуктов 
  let li = createListItem('list__item') //Создаем li 
  li.style.backgroundImage = `url(${picSrc})` //добавляем backg-img к li

  let product = createComponentsForTable(`${name}`, `${price}`) //переменная принимает функцию которая создает элементы внутри li

  const buttonWrapper = createDiv('list__item-btn-wrapper') //Обертка для button

  const countBox = createDiv('list-item__count-box'); //Оберка для счетчика кол-во

  const minusButton = createButton('list__item-btn-minus', '-'); //Создаем кнопку уменьшения кол-во
  minusButton.addEventListener('click', function (event) { //Кнопка уменьшает кол-во продукта
    const target = event.target;

    // Проверяем, была ли нажата кнопка "-"
    if (target.classList.contains('list__item-btn-minus')) {
      const li = target.closest('.list__item'); // Находим родительскую карточку
      const index = Array.from(table.querySelectorAll('.list__item')).indexOf(li);

      if (counterArr[index] > 0) { //Если index больше чем 0 
        counterArr[index]--;

        const updateProductPrice = productPriceArr[index] * counterArr[index]; //Обновляем стоимость продукта  - цена * на кол-во

        li.querySelector('.list-item__amount').textContent = counterArr[index];
        li.querySelector('.list__item-txt').textContent = updateProductPrice;

        updateTotalPrice() //Обновляем блок итоговой цены
      }
    }
  });

  let numberOfProducts = createStrong('list-item__amount', `${counterArr[count]}`); //Переменная принимает strong которая принимает кол-во продукта

  const plusButton = createButton('list__item-btn-plus', '+'); //Создаем кнопку увеличения кол-во
  plusButton.addEventListener('click', function (event) { //Кнопка увеличивает кол-во продукта
    const target = event.target;
    // Проверяем, была ли нажата кнопка "+"
    if (target.classList.contains('list__item-btn-plus')) {
      const li = target.closest('.list__item'); // Находим родительскую карточку
      const index = Array.from(table.querySelectorAll('.list__item')).indexOf(li);
      if (counterArr[index] < 100) { //Если index меньше чем 100

        counterArr[index]++;

        const updateProductPrice = productPriceArr[index] * counterArr[index]; //Обновляем стоимость продукта  - цена * на кол-во

        li.querySelector('.list-item__amount').textContent = counterArr[index];
        li.querySelector('.list__item-txt').textContent = updateProductPrice;
        updateTotalPrice() //Обновляем блок итоговой цены
      }
    }
  });

  countBox.append(minusButton, numberOfProducts, plusButton); //Отправляем btn + и - в div 

  const removeBtn = createButton('list__item-remove-btn', 'Remove'); //Создаем кнопку удалить
  removeBtn.onclick = function (event) {
    const target = event.target;

    if (confirm('Are you sure that you want to remove the product?')) { //Условие при клике на кнопку удалить


      if (target.classList.contains('list__item-remove-btn')) {

        const li = target.closest('.list__item'); // Находим родительскую карточку

        const index = Array.from(table.querySelectorAll('.list__item')).indexOf(li);
        counterArr.splice(index, 1)
        productPriceArr.splice(index, 1)
      }
      li.remove(); //удаляем li


      updateTotalPrice(); //Обновляем блок итоговой цены

      index--; //Уменьшаем значение index в корзине для покупок
      basketProductAmount.textContent = index; // Обновляем текст с количеством продуктов

      const remainingItems = document.querySelectorAll('.list__item'); //Находим все элементы к классом list-item
      if (remainingItems.length === 1) { //Условие, если длина элементов равна 1
        remainingItems[0].classList.add('last-item'); // Если остался только один элемент, добавляем ему новый класс
        table.classList.add('list-one-object'); //Добавляем класс к ul
      }

      if (table.querySelectorAll('li').length === 0) { //Проверка на отсутствие li в ul
        table.remove(); //удаление ul
        let emptyList = createStrong('empty-list', 'Basket is empty'); //Создаем strong с надписью пустая корзина
        container.append(emptyList);
        document.querySelector('.footer').remove(); // Удалить блок с итоговой ценой
      }
    }
  };

  buttonWrapper.append(countBox, removeBtn) //append button edit и remove в div
  product.append(buttonWrapper) //append div с btn edit и remove в div с данными карточки
  li.append(product) //Добавляем div с контентом в li
  table.append(li) //Добавляем li в ul
  return li
}

function renderTable(picArr, productArr, priceArr, i) { //Функция отрисовки таблицы 
  table.innerHTML = "" //Очищаем список перед отрисовкой
  index = 0 //Анулируем перед отрисовкой
  finalProductsPrice = 0 //Аннулируем перед отрисовкой

  for (i = 0; i < productOfNameArr.length; i++) { //Начинаем отрисовку используя массив и цикл 

    productItem = createTableProduct(picArr[i], productArr[i], priceArr[i], i)
    index++ //Добавляем к index +   
    table.append(productItem) //Добавляем li в ul
  }
}

let container = createDiv('container') //создаем контейнер

createHeader()  //вызываем функцию которая создает шапку 

let table = createList('list') //переменая которая принимает функцию, которая создает ul
container.append(table)

document.body.append(container)

renderTable(imgArr, productOfNameArr, productPriceArr, counterArr) //Вызываем функцию отрисовки table

updateTotalPrice() //Вызываем функцию пересчета итоговой стоимости
