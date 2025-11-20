import { qs, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

const alert = new Alert();
alert.displayAlerts();

const dataSource = new ExternalServices('tents');
const products = new ProductList('tents', dataSource, qs('.product-list'));
products.init();

loadHeaderFooter();