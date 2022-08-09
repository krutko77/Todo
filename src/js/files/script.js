// Подключение функционала "Чертогов Фрилансера"
import {
   isMobile
} from "./functions.js";
// Подключение списка активных модулей
import {
   flsModules
} from "./modules.js";

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
// const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);


function addTask(event) {
   //Отключаем перезагрузку страницы при отправке формы
   event.preventDefault();

   //Достаем текст задачи из поля ввода
   const taskText = taskInput.value;

   //Описываем задачу в виде объекта
   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
   };

   //Добавляем задачу в массив с задачами
   tasks.push(newTask);

   // Сохраняем список задач в хранилище браузера LocalStorage
   saveToLocalStorage();

   // Рендерим задачу на странице
   renderTask(newTask);

   taskInput.value = "";
   taskInput.focus();

   checkEmptyList();
};


function deleteTask(event) {

   // Проверяем, если клик НЕ по кнопке delete
   if (event.target.dataset.action !== 'delete') return;

   const parentNode = event.target.closest('.list__group-item');

   //Определяем ID задачи
   const id = parentNode.id;

   //Находим индекс задачи в массиве
   const index = tasks.findIndex((task) => task.id == id);

   // Удаляем задачу из массива данных
   tasks.splice(index, 1);

   // Сохраняем список задач в хранилище браузера LocalStorage
   saveToLocalStorage();

   // Удаляем задачу из разметки
   parentNode.remove();

   checkEmptyList()
};


function doneTask(event) {

   // Проверка, если клик НЕ по кнопке done
   if (event.target.dataset.action !== 'done') return;

   const parentNode = event.target.closest('.list__group-item');

   //Определяем ID задачи
   const id = parentNode.id;

   //Находим задачу в массиве
   const task = tasks.find((task) => task.id == id);
   task.done = !task.done;

   // Сохраняем список задач в хранилище браузера LocalStorage
   saveToLocalStorage();

   const taskTitle = parentNode.querySelector('.list__task-title');
   taskTitle.classList.toggle('list__task-title--done');
};


function checkEmptyList() {
   if (tasks.length == 0) {
      const emptyListHTML = `<li class="list__empty-item" id="emptyList">
     <img class="list__empty-img" src="img/leaf.svg" alt="empty" width="48">
     <div class="list__empty-title">Список дел пуст</div>
  </li>`
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
   };

   if (tasks.length > 0) {
      const emptyListEl = document.querySelector('#emptyList');
      emptyListEl ? emptyListEl.remove() : null;
   };
};


function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
};


function renderTask(task) {

   //Определяем класс css <li></li> в зависимости от done
   const cssClass = task.done ? 'list__task-title list__task-title--done' : 'list__task-title';

   const taskHTML = `<li id="${task.id}" class="list__group-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="list__block-btn-action">
         <button class="list__btn-action" type="button" data-action="done">
            <img src="img/tick.svg" alt="done" width="18" height="18">
         </button>
         <button class="list__btn-action" type="button" data-action="delete">
            <img src="img/cross.svg" alt="Done" width="18" height="18">
         </button>
      </div>
      </li>`;

   tasksList.insertAdjacentHTML('beforeend', taskHTML);
};