import './style.css';
import tasks from './tasks.js';
import { createElement, render } from './elements.js';

function displayTasks() {
  tasks.forEach((task) => {
    const input = createElement('input', {
      type: 'checkbox',
      class: 'todo__checkbox',
    });
    const textTask = task.description;
    const icon = createElement('i', { class: 'fas fa-ellipsis-v kebab' });
    const list = createElement('li', { class: 'todo__task' }, [
      input,
      textTask,
      icon,
    ]);

    render(list, document.querySelector('.todo__root'));
  });
}

displayTasks(tasks);
