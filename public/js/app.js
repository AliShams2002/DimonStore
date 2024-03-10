import {DimondStore} from './dimondstore.js';


export class App{
    static init() {
        this.dimondStore = new DimondStore();

        this.dimondStore.cart.setStorage();

        this.dimondStore.screenMode.setMode();
    }

    static mudal() {
        return this.dimondStore.mudal;
    }

    static getPrudoctRender() {
        return this.dimondStore.productsRender;
    }

    static getLoading() {
        return this.dimondStore.loading;
    }

    static getCart() {
        return this.dimondStore.cart;
    }

    static getCartItem() {
        return this.dimondStore.cartItem;
    }

}

App.init();