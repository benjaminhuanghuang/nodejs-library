import axios from 'axios';
import { $ } from './bling';

function ajaxFavorite(e) {
    e.preventDefault();   // Don't summit the from
    // console.log('HEART ITTT!!!!!!!!!!!!!!!!');
    // console.log(this);   // this is the form
    axios
        .post(this.action)
        .then(res => {   //res is user object
            // this.heart is the button with name "favorite" in form
            const isHearted = this.heartButton.classList.toggle('favorite__button--hearted');
            if (isHearted) {
                // sass/partials/_heart.scss
                this.heartButton.classList.add('favorite__button--float');
                setTimeout(() => this.heartButton.classList.remove('favorite__button--float'), 2500);
            }
        })
        .catch(console.error);
}

export default ajaxFavorite;