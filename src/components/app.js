import { createElement, render } from './render.js';
import Tasks from './tasks.js';

const root = document.querySelector('.todo__root');
const clearBtn = document.querySelector('.todo__btn');

class TodoApp {
  constructor() {
    this.taskArr = [];
  }

  saveLocalStorage() {
    const localTaskArr = JSON.stringify(this.taskArr);
    localStorage.setItem('taskArr', localTaskArr);
  }

  getLocalStorage() {
    if (localStorage.getItem('taskArr')) {
      this.taskArr = JSON.parse(localStorage.getItem('taskArr'));
    }
  }

  getIndex = () => this.taskArr.length + 1;

  clearTaskArr = () => {
    this.taskArr = [];
  };

  updateTaskArr() {
    const tempArr = [...this.taskArr];
    this.taskArr = [];
    tempArr.forEach((task) => {
      const newTask = new Tasks(task.description, false, this.getIndex());
      this.taskArr.push(newTask);
    });

    this.saveLocalStorage();
  }

  addRemoveFunction(trashIcon, index) {
    trashIcon.addEventListener('click', () => {
      this.taskArr.splice(index, 1);
      this.changeClearBtnState();
      this.updateTaskArr();
      this.getLocalStorage();
      this.displayTasks();
    });
  }

  addChangesListener(textTask, index) {
    textTask.addEventListener('input', () => {
      this.taskArr[index].description = textTask.value;
      this.saveLocalStorage();
    });
  }

  setClasses = (li, ellipsisIcon, trashIcon) => {
    li.classList.toggle('highlight');
    ellipsisIcon.classList.toggle('visible');
    trashIcon.classList.toggle('visible');
  };

  addActivationEvent(textTask, li, ellipsisIcon, trashIcon, index) {
    textTask.addEventListener('click', () => {
      this.setClasses(li, ellipsisIcon, trashIcon);
      this.addChangesListener(textTask, index);
    });
    this.addRemoveFunction(trashIcon, index);
  }

  addDeactivationEvent(textTask, li, ellipsisIcon, trashIcon) {
    textTask.addEventListener('focusout', () => {
      setTimeout(() => {
        this.setClasses(li, ellipsisIcon, trashIcon);
      }, 120);
    });
  }

  clearBtnState = 0;

  completedTasks = () => this.clearBtnState;

  changeClearBtnState = () => {
    if (this.completedTasks) clearBtn.classList.add('active');
    else clearBtn.classList.remove('active');
  };

  showCompletedTasks = (index, check, box, textTask) => {
    if (this.taskArr[index].completed === true) {
      check.classList.toggle('hidden');
      box.classList.toggle('hidden');
      textTask.classList.toggle('underlined');
    }
  };

  addCheckboxListener = (checkBox, textTask, box, check, index) => {
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) this.clearBtnState += 1;
      else this.clearBtnState -= 1;
      check.classList.toggle('hidden');
      box.classList.toggle('hidden');
      textTask.classList.toggle('underlined');
      this.taskArr[index].completed = !this.taskArr[index].completed;
      this.saveLocalStorage();
      this.changeClearBtnState();
    });
  };

  deleteCompletedTasks = () => {
    this.clearBtnState = 0;
    this.changeClearBtnState();
    this.taskArr = this.taskArr.filter((task) => task.completed === false);
    this.saveLocalStorage();
    this.getLocalStorage();
    this.updateTaskArr();
    this.displayTasks();
  };

  addEvents = (
    textTask,
    li,
    ellipsisIcon,
    trashIcon,
    checkBox,
    check,
    box,
    index,
  ) => {
    this.addDeactivationEvent(textTask, li, ellipsisIcon, trashIcon);
    this.addCheckboxListener(checkBox, textTask, box, check, index);
    this.addActivationEvent(textTask, li, ellipsisIcon, trashIcon, index);
    this.showCompletedTasks(index, check, box, textTask);
  };

  displayTasks = () => {
    root.innerHTML = '';
    this.taskArr.forEach((task, index) => {
      const textTaskProps = {
        class: 'todo__text-task',
        contenteditable: 'true',
        rows: 1,
      };
      const check = createElement('i', {});
      const box = createElement('i', {});
      const checkBox = createElement('input', {
        type: 'checkBox',
        class: 'todo__checkbox',
      });
      const textTask = createElement('textarea', textTaskProps, [
        task.description,
      ]);
      const ellipsisIcon = createElement('i', {
        class: 'icon fas fa-ellipsis-v ellipsis-icon visible',
      });
      const trashIcon = createElement('i', {
        class: 'icon fas fa-trash-alt trash-icon',
      });
      const liChildren = [
        check,
        box,
        checkBox,
        textTask,
        ellipsisIcon,
        trashIcon,
      ];
      const li = createElement(
        'li',
        { class: 'todo__task-li', draggable: 'true' },
        liChildren,
      );
      this.addEvents(
        textTask,
        li,
        ellipsisIcon,
        trashIcon,
        checkBox,
        check,
        box,
        index,
      );
      render(li, root);
    });
  };

  addTask = (newTaskInput) => {
    if (newTaskInput.value) {
      const newTask = new Tasks(newTaskInput.value, false, this.getIndex());
      this.taskArr.push(newTask);
      this.saveLocalStorage();
      this.displayTasks();
      newTaskInput.value = '';
    }
  };
}

export default TodoApp;
