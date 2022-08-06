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

//Добавление задачи
form.addEventListener('submit', addTask);

//Удаление задачи
tasksList.addEventListener('click', deleteTask);

function addTask(e) {
   event.preventDefault();

   const taskText = taskInput.value;
   const taskHTML = `<li class="list__group-item">
   <span class="list__task-title">${taskText}</span>
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

   if (tasksList.children.length > 1) {
      emptyList.classList.add('none');
   }
}

function deleteTask(e) {

   if (event.target.dataset.action === 'delete') {
      const parenNode = event.target.closest('.list__group-item');
      parenNode.remove();     
   }

   if (tasksList.children.length == 1) {
      emptyList.classList.remove('none');
   }
}