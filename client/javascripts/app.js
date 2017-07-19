import '../scss/style.scss';
import { $, $$ } from './modules/bling';
import ajaxFavorite from './modules/favorite';

const favForms = $$('form.favorite');   // all favorite form in the page.
favForms.on('submit', ajaxFavorite);   
