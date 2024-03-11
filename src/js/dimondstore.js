import {ProductsRender} from './productRender.js'
import {Fillters} from './fillters.js'
import {Cart} from './cart.js'
import {CartItem} from './cartItem.js'
import {Loading} from './loading.js'
import {ScreenMode} from './screenMode.js'


export class DimondStore{
    constructor(){
        this.productsRender = new ProductsRender();
        this.fillter = new Fillters();
        this.cart = new Cart();
        this.cartItem = new CartItem();
        this.loading = new Loading();
        this.screenMode = new ScreenMode();
    }
}