import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ExternalServices('tents');
const product = new ProductDetails(getParam('product'), dataSource);

product.init();

loadHeaderFooter();