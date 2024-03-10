export class ScreenMode{
    constructor() {
        this.mode = document.getElementById('mode');
        this.screenMode;

        this.setScreemHandler();
    }

    setScreemHandler() {
        this.mode.addEventListener('click', (event) => {
            event.preventDefault();
            if(document.documentElement.classList.contains('dark')) {
                this.mode.classList.replace('ri-moon-fill', 'ri-sun-line')
                this.screenMode = 'light';
                document.documentElement.className = this.screenMode;
                this.updateMode();    
              }
              else {
                this.mode.classList.replace('ri-sun-line', 'ri-moon-fill')
                this.screenMode = 'dark';
                document.documentElement.className = this.screenMode;
                this.updateMode();
              }
        })
    }

    check() {
        if(this.screenMode === 'dark') {
            this.mode.classList.replace('ri-sun-line', 'ri-moon-fill')
          }
          else{
            this.mode.classList.replace('ri-moon-fill', 'ri-sun-line')
          }
    }

    updateMode() {
        localStorage.setItem('mode', JSON.stringify(this.screenMode));
    }

    setMode() {
        const item = localStorage.getItem('mode');

        if(item === undefined) {
            return;
        }

        const getMode = JSON.parse(localStorage.getItem('mode'));
        this.screenMode = getMode;
        document.documentElement.classList.add(this.screenMode);
        this.check();
    }
}