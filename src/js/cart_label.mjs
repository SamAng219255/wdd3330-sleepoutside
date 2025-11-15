import { getLocalStorage, qs } from './utils.mjs';

export default function setCartLabel(value) {
	if(value == undefined) {
		value = (getLocalStorage('so-cart') || []).length;
	}

	const cartLabel = qs('.cart span');

	cartLabel.innerText = value;

	if(value <= 0) cartLabel.classList.remove('show');
	else cartLabel.classList.add('show');
}

window.addEventListener("storage", (event) => {
	if(event.storageArea === localStorage && event.key == 'so-cart')
		setCartLabel();
});