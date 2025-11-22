import { qs, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = getParam('category');
const dataSource = new ProductData();
const products = new ProductList(category, dataSource, qs('.product-list'));
products.init();

const categoryNames = {
    tents: 'Tents',
    backpacks: 'Backpacks',
    'sleeping-bags': 'Sleeping Bags',
    hammocks: 'Hammocks',
};
if (category in categoryNames) {
    qs('h2').innerText = `Top Products: ${categoryNames[category]}`;
}