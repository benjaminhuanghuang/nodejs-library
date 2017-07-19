import '../scss/style.scss';
import { $, $$ } from './modules/bling';
import ajaxFavorite from './modules/favorite';

const favForm = $$('form.favorite');
favForm.on('submit', ajaxFavorite);
