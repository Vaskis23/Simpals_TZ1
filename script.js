// Получение элементов из DOM
const itemList = document.getElementById('itemList');
const addItemButton = document.getElementById('addItemButton');
const deleteItemButton = document.getElementById('deleteItemButton');
const reversButton = document.getElementById('reversButton');
const prefixInput = document.getElementById('prefixInput');

// Счетчик элементов списка
let itemCounter = 0;

// Функция для добавления новой строки в список
function addItem() {
  // Получение префикса из поля ввода
  const prefix = prefixInput.value;
  // Создание нового элемента li
  const li = document.createElement('li');
  // Генерация случайного цвета для фона элемента
        li.style.backgroundColor = randomColor();
        // Установка текстового содержимого элемента li с учетом префикса и счетчика
        li.textContent = prefix ? `${prefix} ${itemCounter + 1}` : `block ${itemCounter + 1}`;
        // Добавление класса 'item' к элементу li
        li.classList.add('item');

  // Применяем разный цвет к элементам списка
  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  //Создание и настройка элемента radioBtn
  const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'radioItem';
  // Добавление обработчика события при клике на кнопку выбора
        radioBtn.addEventListener('click', (event) => {
  // Переключение класса 'selected' для элемента li при клике на кнопку выбора
        li.classList.toggle('selected');
  });

  //Создание и настройка кнопки removeBtn
  const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-button');
        removeBtn.addEventListener('click', () => {
        li.remove();
  });

  //Создание и настройка контейнера removeContainer
  const removeContainer = document.createElement('div');
  // Добавление кнопки удаления в контейнер removeContainer
        removeContainer.appendChild(removeBtn);
  // Добавление элементов radioBtn и removeContainer в элемент li
        li.appendChild(radioBtn);
        li.appendChild(removeContainer);
  // Добавление элемента li в список itemList
        itemList.appendChild(li);
  // Увеличение счетчика элементов списка
        itemCounter++;
}

// Функция для удаления последнего элемента из списка
function deleteLastItem() {
  // Получение последнего элемента списка
  const lastItem = itemList.lastElementChild;
  // Если элемент существует, то удалить его
    if (lastItem) {
      lastItem.remove();
    }
}

// Функция для переворота списка
function reverseList() {
  // Получение всех элементов списка в виде массива
  const items = Array.from(itemList.children);
  // Разворот массива элементов
        items.reverse();
  // Очистка списка
        itemList.innerHTML = '';
  // Добавление элементов обратно в обратном порядке
        items.forEach(item => itemList.appendChild(item));
}

// Функция для перемещения выбранного элемента вверх
function moveItemUp() {
  // Получение выбранного элемента списка
  const selected = document.querySelector('.item.selected');
  // Если элемент существует и у него есть предыдущий сосед
    if (selected && selected.previousElementSibling) {
      // Перемещение выбранного элемента перед его предыдущим соседом
      itemList.insertBefore(selected, selected.previousElementSibling);
    }
}

// Функция для перемещения выбранного элемента вниз
function moveItemDown() {
  // Получение выбранного элемента списка
  const selected = document.querySelector('.item.selected');
  // Если элемент существует и у него есть следующий сосед
    if (selected && selected.nextElementSibling) {
      // Перемещение выбранного элемента после его следующего соседа
      itemList.insertBefore(selected.nextElementSibling, selected);
    }
}

// Обработчик события для кнопки добавления
addItemButton.addEventListener('click', addItem);

// Обработчик события для кнопки удаления последнего элемента
deleteItemButton.addEventListener('click', deleteLastItem);

// Обработчик события для кнопки Revers List
reversButton.addEventListener('click', reverseList);

// Обработчик события для клавиш ArrowUp и ArrowDown
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
      moveItemUp();
    } else if (event.key === 'ArrowDown') {
      moveItemDown();
    }
});