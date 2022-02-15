import './style.css';
import TodoApp from './components/app.js';

const app = new TodoApp();
const newTask = document.querySelector('.todo__input');
const refreshBtn = document.querySelector('.refresh');

function main() {
  app.getLocalStorage();
  app.displayTasks();

  refreshBtn.addEventListener('click', () => {
    app.displayTasks();
  });

  newTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      app.addTask(newTask);
    }
  });
}

main();
