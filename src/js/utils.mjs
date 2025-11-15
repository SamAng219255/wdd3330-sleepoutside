import setCartLabel from './cart_label.mjs';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
// get a url query parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// renders a list with a given template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML(position, list.map(templateFn).join('\n'));
}
// renders an html template
export function renderWithTemplate(template, parentElement, callback, data) {
  parentElement.innerHTML = template;

  if(callback !== undefined)
    callback(data);
}
// fetches a template from the given path
async function loadTemplate(path) {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}
// fetches and loads the header and footer
export async function loadHeaderFooter() {
  const header = await loadTemplate('/partials/header.html');
  const footer = await loadTemplate('/partials/footer.html');

  const headerElem = document.getElementById('main-header');
  const footerElem = document.getElementById('main-footer');

  renderWithTemplate(header, headerElem, setCartLabel);
  renderWithTemplate(footer, footerElem, setCartLabel);
}