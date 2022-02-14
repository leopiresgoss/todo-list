function createElement(type, attributeList = {}, children = []) {
  const element = document.createElement(type);
  const keys = Object.keys(attributeList);

  keys.map((key) => element.setAttribute(key, attributeList[key]));
  children.map((child) => renderChild(element, child));
  return element;
}

function renderChild(element, child) {
  if (typeof child === 'string') {
    element.innerHTML = element.innerHTML + child;
    return;
  }

  element.appendChild(child);
}

function render(element, DOMelement) {
  DOMelement.appendChild(element);
}

export { createElement, render };
