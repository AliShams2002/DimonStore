import {App} from './app.js'
import axios from 'axios';

export class Fillters{
    constructor(){
        this.filltersBtn = document.getElementsByName('fillter');
        this.sortBtn = document.getElementsByName('sort');
        this.productSelector = document.getElementById('product-selector');
        this.sortSelector = document.getElementById('sort-selector');

        let product;
        let sorts;

        this.fillterHandler();
    }

    fillterHandler() {

        this.filltersBtn.forEach((item) => {
            item.addEventListener('click', () => {
                this.product = item.value;
                this.productFillter(item.value);
            })
        })

        this.sortBtn.forEach((item) => {
            item.addEventListener('click', () => {
                this.sorts = item.value;
                this.productFillter(item.value);
            })
        })

        this.productSelector.addEventListener('change', (e) => {
            const value = e.target.value;
            this.product = value;
            this.productFillter(value);
        })

        this.sortSelector.addEventListener('change', (e) => {
            const value = e.target.value;
            this.sorts = value;
            this.productFillter(value);
        })
        
    }

    async productFillter(value) {

            App.getLoading().show();

            if(this.product === 'all' || this.product === undefined) {
                const {data: response} = await axios.get(`https://fakestoreapi.com/products?sort=${this.sorts}`);
    
                App.getPrudoctRender().render(response);
            }
            else if(value === 'all') {

                const {data: response} = await axios.get('https://fakestoreapi.com/products');
    
                App.getPrudoctRender().render(response);
    
            }
            else {
                const {data: response} = await axios.get(`https://fakestoreapi.com/products/category/${this.product}?sort=${this.sorts}`);

                App.getPrudoctRender().render(response);
            }
    }

}