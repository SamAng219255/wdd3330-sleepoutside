import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');
const product = new ProductDetails(getParam('product'), dataSource);

product.init();

loadHeaderFooter();