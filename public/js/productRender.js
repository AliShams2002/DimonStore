import {App} from './app.js'
import {Mudal} from './mudal.js'
import axios from 'axios';

export class ProductsRender{
    constructor(){
        this.products = document.getElementById('products');
        this.close = document.getElementById('close');

        this.fetch();
    }

    async fetch(){
        const {data: response} = await axios.get('https://fakestoreapi.com/products');

        this.render(response);

    }

    render(items){

        this.products.innerHTML = '';

        App.getLoading().hide()

        items.forEach((item) => {
            let productElm = document.createElement('div');

            productElm.className = 'dark:bg-[#200f2f] dark:shadow-slate-900 bg-white w-full h-64 rounded-md py-2 px-3 shadow-sm shadow-gray-400';
            productElm.id = `${item.id}`

            productElm.innerHTML = 
            `
            <div class="flex flex-col gap-3">
                    <img src="${item.image}" alt="" class="w-full h-28 rounded-md" id="img">
                    <span class="dark:text-gray-300 h-6 text-sm font-bold w-full overflow-hidden" id="title">${item.title}</span>
                    <div class="flex items-center justify-between">
                        <span class="dark:text-[#7950f2] font-semibold text-[#400ed6]" id="price">$${item.price}</span>
                        <span class="dark:text-gray-300 font-semibold">${item.rating.rate}<i class="ri-star-fill text-yellow-300"></i></span>
                    </div>
                    <div class="flex flex-row-reverse items-center justify-between gap-1 mt-2">
                        <button type="button" class="btn dark:text-gray-300 dark:bg-[#7950f2]" id="buy-btn">Add To Cart</button>
                        <button type="button" class="btn bg-[#37b24d] hover:bg-[#358b45]" id="details">Detalis</button>
                    </div>
                    
                </div>
            `

            this.products.appendChild(productElm);
            

            const details = productElm.querySelector('#details');
            details.addEventListener('click', () => {
                const mudalElm = new Mudal(productElm.id);
                mudalElm.openMudal(productElm);
            });
            productElm.querySelector('#buy-btn').addEventListener('click', () => {
                App.getCart().fetch(productElm.id);
            })

        })
    }

}