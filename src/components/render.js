function renderChild(element, child) {
  if (typeof child === 'string') {
    element.innerHTML += child;
    return;
  }

  element.appendChild(child);
}

function createElement(type, attributeList = {}, children = []) {
  const element = document.createElement(type);
  const keys = Object.keys(attributeList);

  keys.map((key) => element.setAttribute(key, attributeList[key]));
  children.map((child) => renderChild(element, child));
  return element;
}

function render(element, DOMelement) {
  DOMelement.appendChild(element);
}

export { createElement, render };
