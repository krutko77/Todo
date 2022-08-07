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
const emptyList = document.querySelector('#emptyList');

let tasks = [];

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
   
   //Определяем класс css <li></li> в зависимости от done
   const cssClass = newTask.done ? 'list__task-title list__task-title--done' : 'list__task-title';
  
   const taskHTML = `<li id="${newTask.id}" class="list__group-item">
   <span class="${cssClass}">${newTask.text}</span>
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

   taskInput.value = "";
   taskInput.focus();

   //Прячем #emptyList
   if (tasksList.children.length > 1) {
      emptyList.classList.add('none');
   }
}

function deleteTask(event) {

   // Проверяем, если клик НЕ по кнопке delete
   if (event.target.dataset.action !== 'delete') return;

   const parentNode = event.target.closest('.list__group-item');

   //Определяем ID задачи
   const id = parentNode.id;

   //Находим индекс задачи в массиве
   const index = tasks.findIndex(function(task) {      
         return tasks.id == id;
      });

   // Удаляем задачу из массива данных
   tasks.splice(index, 1);



   // Удаляем задачу из разметки
   parentNode.remove();

   // Показываем #emptyList
   if (tasksList.children.length == 1) {
      emptyList.classList.remove('none');
   }
}

function doneTask(event) {

   // Проверка, если клик не по кнопке done
   if (event.target.dataset.action !== 'done') return;

   const parentNode = event.target.closest('.list__group-item');
   const taskTitle = parentNode.querySelector('.list__task-title');
   taskTitle.classList.toggle('list__task-title--done');
}