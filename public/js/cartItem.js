import {App} from './app.js'

export class CartItem{
    constructor(item, quantity = 1) {

        this.item = item;
        this.quantity = quantity;
    }

    htmlElementId() {
        return this.item.id;
    }

    render() {

        const productElm = document.createElement('li');

        productElm.className = 'w-full flex items-center justify-between gap-3 h-14';

        productElm.id = this.item.id;

        productElm.innerHTML = 
            `
                <div class="w-[30%] h-14 bg-cover">
                    <img src="${this.item.image}" alt="" class="h-full w-2/3 rounded-md">
                    </div>
                    <div class="w-[70%] h-full flex flex-col gap-1">
                        <span class="dark:text-gray-300 overflow-hidden">${this.item.title}</span>
                        <div class="flex items-center gap-3">
                            <span class="dark:text-gray-200 font-semibold w-[40%]">$${this.item.price}</span>
                            <div class="w-auto">
                                <span class="quantity-decrease bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer text-sm">-</span>
                                <span class="dark:text-gray-300 quantity font-semibold">${this.quantity}</span>
                                <span class="quantity-increase bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer text-sm">+</span>
                            </div>
                            
                        </div>
                    
                    </div>
            `       

            productElm.querySelector('.quantity-decrease').addEventListener('click', this.decreaseQuantity.bind(this))

            productElm.querySelector('.quantity-increase').addEventListener('click', this.increaseQuantity.bind(this))

            this.item.quantity = this.quantity;

            return productElm;
    }
    

    decreaseQuantity() {
        this.quantity--;

        if (this.quantity < 1) {
            this.updateMethods();

            App.getCart().remove(this.item.id);
            return;
        }

        this.updateMethods();
    }

    increaseQuantity() {
        this.quantity++;

        this.updateMethods();        
    }

    updateMethods() {
        this.render();
        this.updateQuantityUI();

        App.getCart().updateCartTotal();
        App.getCart().updateStorage();
    }

    updateQuantityUI() {
        const cartItemElm = document.getElementById(this.htmlElementId());
        cartItemElm.querySelector('.quantity').innerText = this.quantity;
    }

}