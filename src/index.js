import './style.css';
import TodoApp from './components/app.js';

const app = new TodoApp();
const newTask = document.querySelector('.todo__input');
const refreshBtn = document.querySelector('.refresh');
const removeCompleted = document.querySelector('.todo__btn');

function main() {
  app.getLocalStorage();
  app.displayTasks();

  refreshBtn.addEventListener('click', () => {
    app.clearTaskArr();
    app.changeClearBtnState();
    app.displayTasks();
  });

  newTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      app.addTask(newTask);
    }
  });

  removeCompleted.addEventListener('click', () => {
    app.deleteCompletedTasks();
  });

  app.changeClearBtnState();
}

main();
