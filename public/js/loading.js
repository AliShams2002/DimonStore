export class Loading{
    constructor() {
        this.loadingElm = document.getElementById('loading');
        this.productElm = document.getElementById('products');
    }

    show() {
        this.loadingElm.classList.remove('hidden');
        this.productElm.classList.add('hidden');
    }

    hide() {
        this.loadingElm.classList.add('hidden');
        this.productElm.classList.remove('hidden');
    }

}