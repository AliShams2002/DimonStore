import {CartItem} from './cartItem.js';
import axios from 'axios';

export class Cart{
    constructor() {
        this.items = [];
        this.products = [];

        this.cartTitle = document.getElementById('cart-title');
        this.cartNotification = document.getElementById('cart-notification');
        this.cartElm = document.getElementById('cart-items');
        this.cartItemsList = document.getElementById('cart-items-list');
        this.cartBtn = document.getElementById('cart-btn');
        this.cartBox = document.getElementById('cart-box');
        
        this.cartItemsList = document.getElementById('cart-items-list');
        
        this.cartTotal = document.getElementById('cart-total');

        this._cartHandler();

        this.quantity;
    }

    async fetch(id, quantity = 1) {

        const {data: response} = await axios.get(`https://fakestoreapi.com/products/${id}`);

        this.addItems(response, quantity);

    }

    _cartHandler() {
        this.cartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.cartBox.classList.toggle('hidden');
        })
    }

    findItem(id) {
        return this.items.find(item => item.item.id === id);
    }

    has(id) {
        return !! this.findItem(id);
    }

    addItems(item, quantity) {
        if(this.has(item.id)) {
            this.findItem(item.id).increaseQuantity();

            return;
        }

        const cartItem = new CartItem(item, quantity);

        this.items.push(cartItem);
        this.products.push(item);
        
        this.removeEmptyBox();

        const cartItemElm = cartItem.render();

        this.cartItemsList.append(cartItemElm);

        this.updateCartNotification();
        this.updateCartTotal();
        this.updateStorage();
  
    }

    updateCartNotification() {
        if(this.items.length > 0){
            this.cartNotification.classList.remove('hidden');
            this.cartNotification.innerText = this.items.length;
        }
        else {
            this.cartNotification.classList.add('hidden');
        }
    }

    updateCartTotal() {

        const totalCart = this.products.reduce((prevValue, cartItem) => {
            return prevValue + (cartItem.price * cartItem.quantity);
        },0)

        this.cartTotal.innerText = `$${totalCart.toFixed(1)}`;
    }

    remove(id) {
        if(! this.has(id)) {
            return;
        }

        const index = this.items.findIndex(item => item.item.id === id);

        document.getElementById(this.items[index].htmlElementId()).remove();

        this.items.splice(index, 1);

        this.updateCartNotification();
        this.updateCartTotal();
        this.removeEmptyBox();
        this.updateStorage();
    }

    removeEmptyBox() {
        if(this.items.length < 1) {
            this.cartTitle.classList.remove('hidden');
            this.cartElm.classList.add('hidden');
        }
        else {
            this.cartTitle.classList.add('hidden');
            this.cartElm.classList.remove('hidden');
        }
    }

    updateStorage() {
        localStorage.setItem('DimondStore', JSON.stringify(this.items));
    }

    setStorage() {
        const items = localStorage.getItem('DimondStore');

        if(!items) {
            return;
        }

        const cartStorage = JSON.parse(localStorage.getItem('DimondStore'));
        cartStorage.forEach((item) => {
            this.fetch(item.item.id, item.quantity);
        })
    }
    
}