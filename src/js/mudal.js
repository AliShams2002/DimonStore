import {App} from './app.js'
import axios from 'axios';

export class Mudal{
    constructor(id){
        this.mudalElm = document.getElementById('mudal');
        this.buyBtn = document.getElementById('mudal-buy-btn');

        this.id = id;

        this.buyHandler();
    }

    async openMudal(item) {
        const itemId = item.id;

        const {data: response} = await axios.get(`https://fakestoreapi.com/products/${itemId}`);

        this.mudalElm.classList.remove('hidden');

        this.setMudal(response);
    }

    setMudal(items) {

            this.mudalElm.querySelector('img').src = items.image;
            this.mudalElm.querySelector('#title').innerHTML = items.title;
            this.mudalElm.querySelector('#categorie').innerHTML = items.category;
            this.mudalElm.querySelector('#description').innerHTML = items.description;
            this.mudalElm.querySelector('#price').innerHTML = `$${items.price}`;

            this.mudalElm.querySelector('#close').addEventListener('click', this.closeMudal.bind(this));
       
    }

    buyHandler() {
        this.buyBtn.addEventListener('click', () => {
            App.getCart().fetch(this.id);
        })
    }

    closeMudal() {
        this.mudalElm.classList.add('hidden');

        const newButton = this.mudalElm.querySelector('#mudal-buy-btn').cloneNode(true);
        this.mudalElm.querySelector('#mudal-buy-btn').remove();

        this.mudalElm.querySelector('#price').before(newButton);
    }
    
}