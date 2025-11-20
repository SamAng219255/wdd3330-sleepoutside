import { qs, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

const alert = new Alert();
alert.displayAlerts();

const dataSource = new ProductData('tents');
const products = new ProductList('tents', dataSource, qs('.product-list'));
products.init();

loadHeaderFooter();