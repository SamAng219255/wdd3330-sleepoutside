import { getLocalStorage, qs } from './utils.mjs';

export default function setCartLabel(value) {
	let count = value;
	
	if(count == undefined) {
		count = (getLocalStorage('so-cart') || []).length;
	}

	const cartLabel = qs('.cart span');

	cartLabel.innerText = count;

	if(count <= 0) cartLabel.classList.remove('show');
	else cartLabel.classList.add('show');
}

window.addEventListener('storage', (event) => {
	if(event.storageArea === localStorage && event.key == 'so-cart')
		setCartLabel();
});